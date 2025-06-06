// routes/project.js
const express = require('express');
const multer = require('multer');
const path = require('path');
const Project = require('../models/project');
const router = express.Router();

const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => {
    const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, unique + ext);
  }
});

const upload = multer({ storage });

router.post('/create', upload.single('file'), async (req, res) => {
  try {
    const { title, description, technologies } = req.body;
    
    const newProject = new Project({
      title,
      description,
      technologies,
      files: [
        {
          name: req.file?.originalname,
          path: req.file?.path,
          url: `/uploads/${req.file?.filename}`,
          uploadedAt: new Date(),
        }
      ],
      
      owner: req.body.owner 
    });

    await newProject.save();
    res.status(201).json({ success: true, project: newProject });

  } catch (error) {
    console.error("Error creating project:", error);
    res.status(500).json({ success: false, message: 'Eroare la creare proiect' });
  }
});


router.get('/', async (req, res) => {
  try {
    const projects = await Project.find()
      .populate('owner', 'username firstName lastName') // dacă vrei date despre owner
      .sort({ createdAt: -1 }); // opțional: cele mai recente primele
    res.json(projects);
  } catch (err) {
    console.error('Eroare la fetch proiecte:', err);
    res.status(500).json({ error: 'Eroare la preluarea proiectelor' });
  }
});

module.exports = router;
