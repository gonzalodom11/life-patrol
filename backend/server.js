const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');
const sensorRoutes = require('./routes/sensor');
const authRoutes = require('./routes/auth');
require('dotenv').config();

const app = express();

// Middleware
const allowedOrigin = process.env.ALLOWED_ORIGIN

app.use(cors({
  origin: allowedOrigin,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(express.json());

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