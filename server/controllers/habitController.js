const Habit = require('../models/Habit');
const HabitCompletion = require('../models/HabitCompletion');

const getHabits = async (req, res) => {
  try {
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    const endOfToday = new Date();
    endOfToday.setHours(23, 59, 59, 999);

    const filter = { user: req.user.id };
    if (req.query.category) {
      filter.category = req.query.category;
    }
    const habits = await Habit.find(filter);

    const completions = await HabitCompletion.find({
      user: req.user.id,
      date: { $gte: startOfToday, $lte: endOfToday },
    });
    
    const completedHabitIds = new Set(completions.map(c => c.habit.toString()));

    const habitsWithCompletion = habits.map(habit => {
      const habitJson = habit.toJSON();
      habitJson.isCompletedToday = completedHabitIds.has(habit._id.toString());
      return habitJson;
    });

    res.json(habitsWithCompletion);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const createHabit = async (req, res) => {
  const { name, frequency, category } = req.body;
  if (!name || !frequency) {
    return res.status(400).json({ message: 'Please provide name and frequency' });
  }

  try {
    const habit = new Habit({
      name,
      frequency,
      category: category || 'General',
      user: req.user.id,
      currentStreak: 0,
    });
    const createdHabit = await habit.save();
    res.status(201).json(createdHabit);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'You already have a habit with this name.' });
    }
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const checkinHabit = async (req, res) => {
  try {
    const habit = await Habit.findById(req.params.id);
    if (!habit || habit.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }
    
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);
    const endOfToday = new Date();
    endOfToday.setHours(23, 59, 59, 999);

    const existingCompletion = await HabitCompletion.findOne({
      habit: req.params.id,
      date: { $gte: startOfToday, $lte: endOfToday },
    });

    if (existingCompletion) {
      return res.status(400).json({ message: 'Habit already completed today' });
    }
    
    const startOfYesterday = new Date(startOfToday);
    startOfYesterday.setDate(startOfYesterday.getDate() - 1);
    
    const yesterdayCompletion = await HabitCompletion.findOne({
      habit: req.params.id,
      date: { $gte: startOfYesterday, $lt: startOfToday }
    });

    if (yesterdayCompletion) {
      habit.currentStreak += 1;
    } else {
      habit.currentStreak = 1;
    }
    await habit.save();

    const completion = new HabitCompletion({
      habit: req.params.id,
      user: req.user.id,
      date: new Date(),
    });

    await completion.save();
    res.status(201).json({ message: 'Check-in successful', habit });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};


const deleteHabit = async (req, res) => {
  try {
    const habit = await Habit.findById(req.params.id);
    if (!habit) return res.status(404).json({ message: 'Habit not found' });
    if (habit.user.toString() !== req.user.id) return res.status(401).json({ message: 'User not authorized' });
    
    await Habit.deleteOne({ _id: req.params.id });
    await HabitCompletion.deleteMany({ habit: req.params.id });
    res.json({ message: 'Habit removed' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getHabits, createHabit, deleteHabit, checkinHabit };