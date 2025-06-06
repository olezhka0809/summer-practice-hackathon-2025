const express = require('express');
const router = express.Router();
const User = require('../models/user');
const { registerUser } = require('../controllers/authController');

router.post('/register', registerUser);
router.get('/all-users', async (req, res) => {
  try {
    const users = await User.find({}, '-password').lean();

    const formattedUsers = users.map(user => ({
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username
    }));

    res.json(formattedUsers);
  } catch (err) {
    console.error('Eroare la fetch utilizatori:', err);
    res.status(500).json({ message: 'Eroare la server' });
  }
});


module.exports = router;
