const User = require('../models/user'); // sau models.js, în funcție de cum ai exportat
const bcrypt = require('bcrypt');

const registerUser = async (req, res) => {
  try {
    const { name, surname, nickname, password } = req.body;

    // verificare duplicat username
    const existing = await User.findOne({ username: nickname });
    if (existing) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      firstName: name,
      lastName: surname,
      username: nickname,
      password: hashedPassword,
      friends: [],
      projects: []
    });

    res.status(201).json({
      message: 'User created successfully',
      user: {
        id: user._id,
        name: user.firstName,
        username: user.username
      }
    });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ message: 'Server error during registration' });
  }
};

module.exports = { registerUser };
