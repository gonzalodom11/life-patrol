const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');
const sensorRoutes = require('./routes/sensor');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors({
  origin: [process.env.FRONTEND_URL],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));
app.use(express.json());

// Connect to MongoDB Atlas
connectDB();

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'IoT API is running' });
});

app.use('/api/sensor', sensorRoutes);

// Start server
const PORT = process.env.PORT ;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});