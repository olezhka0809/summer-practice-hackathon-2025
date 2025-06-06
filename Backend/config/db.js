const mongoose = require('mongoose');

const connectDB = () =>
  mongoose.connect(process.env.MONGO_URI)
    .then(conn => console.log(`MongoDB conectat: ${conn.connection.host}`))
    .catch(error => {
      console.error(`Eroare la conectarea MongoDB: ${error.message}`);
      process.exit(1);
    });

module.exports = connectDB;
