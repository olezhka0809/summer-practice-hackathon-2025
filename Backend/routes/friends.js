
const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Project = require('../models/project');


router.get('/', async (req, res) => {
  const { userId } = req.query;
  try {
    const user = await User.findById(userId).populate('friends');
    if (!user) return res.status(404).json({ message: 'User not found' });

    const results = [];

    for (const friend of user.friends) {
      const commonProjects = await Project.find({
        $or: [
          { owner: friend._id, visibleTo: user._id },
          { owner: user._id, visibleTo: friend._id },
          { owner: friend._id, owner: user._id }
        ]
      });

      results.push({
        friendId: friend._id,
        name: `${friend.firstName} ${friend.lastName}`,
        projects: commonProjects.map(p => ({
          title: p.title,
          id: p._id
        }))
      });
    }

    res.json(results);
  } catch (err) {
    console.error('Eroare fetch prieteni:', err);
    res.status(500).json({ message: 'Eroare la server' });
  }
});

router.post('/add', async (req, res) => {
  const { userId, friendId } = req.body;

  if (!userId || !friendId) {
    return res.status(400).json({ message: 'userId și friendId sunt necesare' });
  }

  if (userId === friendId) {
    return res.status(400).json({ message: 'Nu poți adăuga singur ca prieten' });
  }

  try {
    const user = await User.findById(userId);
    const friend = await User.findById(friendId);

    if (!user || !friend) {
      return res.status(404).json({ message: 'Utilizatorul sau prietenul nu a fost găsit' });
    }

    // Adaugă prietenul doar dacă nu există deja
    if (!user.friends.includes(friendId)) {
      user.friends.push(friendId);
      await user.save();
    }

    // Opțional: Adaugă utilizatorul și în lista prietenului (bidirecțional)
    if (!friend.friends.includes(userId)) {
      friend.friends.push(userId);
      await friend.save();
    }

    res.status(200).json({ message: 'Prieten adăugat cu succes!' });
  } catch (err) {
    console.error('Eroare adăugare prieten:', err);
    res.status(500).json({ message: 'Eroare la server' });
  }
});

module.exports = router;
