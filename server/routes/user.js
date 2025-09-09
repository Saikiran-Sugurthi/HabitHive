const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { searchUsers, followUser, getFeed } = require('../controllers/userController');

router.route('/').get(protect, searchUsers);
router.route('/feed').get(protect, getFeed);
router.route('/:id/follow').put(protect, followUser);

module.exports = router;