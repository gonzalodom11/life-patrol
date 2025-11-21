const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');
const sensorRoutes = require('./routes/sensor');
const authRoutes = require('./routes/auth');
require('dotenv').config();

const app = express();

// Middleware
const allowedOrigin = process.env.ALLOWED_ORIGIN

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", allowedOrigin);
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});
// Connect to MongoDB Atlas
connectDB();

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'IoT API is running' });
});

app.use('/api/sensor', sensorRoutes);
app.use('/api/auth', authRoutes);

// Start server
const PORT = process.env.PORT ;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});