const express = require('express');
const router = express.Router();
const User = require('../models/user');
const { registerUser } = require('../controllers/authController');

router.post('/register', registerUser);
router.get('/all-users', async (req, res) => {
  try {
    const users = await User.find().select('-password'); // exclude parola
    res.json(users);
  } catch (err) {
    console.error('Eroare la fetch utilizatori:', err);
    res.status(500).json({ message: 'Eroare la server' });
  }
});

module.exports = router;
