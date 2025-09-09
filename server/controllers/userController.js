const User = require('../models/User');
const HabitCompletion = require('../models/HabitCompletion');

const searchUsers = async (req, res) => {
  const keyword = req.query.search
    ? {
        username: {
          $regex: req.query.search,
          $options: 'i',
        },
      }
    : {};

  try {
    const users = await User.find(keyword).find({ _id: { $ne: req.user._id } }).select('username email');
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const followUser = async (req, res) => {
  try {
    if (req.user.id === req.params.id) {
        return res.status(400).json({ message: "You cannot follow yourself" });
    }

    const userToFollow = await User.findById(req.params.id);
    const currentUser = await User.findById(req.user.id);

    if (!userToFollow || !currentUser) {
        return res.status(404).json({ message: "User not found" });
    }

    if (currentUser.following.includes(userToFollow._id)) {
        return res.status(400).json({ message: "You are already following this user" });
    }

    await currentUser.updateOne({ $addToSet: { following: userToFollow._id } });
    await userToFollow.updateOne({ $addToSet: { followers: currentUser._id } });
    
    res.json({ message: `You are now following ${userToFollow.username}` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getFeed = async (req, res) => {
    try {
        const currentUser = await User.findById(req.user.id);
        const followingIds = currentUser.following;

        const feedItems = await HabitCompletion.find({ user: { $in: followingIds } })
            .populate('user', 'username')
            .populate('habit', 'name')
            .sort({ createdAt: -1 })
            .limit(20);
        
        res.json(feedItems);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { searchUsers, followUser, getFeed };