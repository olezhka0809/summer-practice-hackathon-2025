  const express = require('express');
  const dotenv = require('dotenv');
  const cors = require('cors');
  const helmet = require('helmet');
  const morgan = require('morgan');
  const connectDB = require('./config/db');
  
  


  dotenv.config();
  connectDB();
  const app = express();

  app.use(cors());
  app.use(helmet());
  app.use(morgan('dev'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  



  const authRoutes = require('./routes/auth');


  app.use('/api/auth', authRoutes);

  app.get('/', (req, res) => {
    res.json({ message: 'API GitGud funcționează!' });
  });
  

  // Middleware pentru tratarea erorilor
  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
      success: false,
      message: 'Eroare internă de server!',
      error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  });

 const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
    console.log(`Serverul rulează pe portul ${PORT}`);
});


