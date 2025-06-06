const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');
const connectDB = require('./config/db');


dotenv.config();
connectDB();

const app = express();

// Middlewares
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 📁 Servim fișiere statice din uploads/
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api/projects', require('./routes/project'));
// Rute
const authRoutes = require('./routes/auth');
const projectRoutes = require('./routes/project');

app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'API GitGud funcționează!' });
});

// Middleware de eroare
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Eroare internă de server',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Serverul rulează pe portul ${PORT}`);
});
