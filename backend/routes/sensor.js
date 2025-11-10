const express = require('express');
const router = express.Router();
const SensorData = require('../models/SensorData');

// POST - Add new sensor reading
router.post('/data', async (req, res) => {
  try {
    const newReading = new SensorData(req.body);
    const savedReading = await newReading.save();
    res.status(201).json(savedReading);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// GET - Get all sensor data
router.get('/data', async (req, res) => {
  try {
    const data = await SensorData.find()
      .sort({ timestamp: -1 })
      .limit(100);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET - Get data by device ID
router.get('/data/:deviceId', async (req, res) => {
  try {
    const data = await SensorData.find({ 
      deviceId: req.params.deviceId 
    }).sort({ timestamp: -1 });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET - Get latest reading
router.get('/data/latest/:deviceId', async (req, res) => {
  try {
    const data = await SensorData.findOne({ 
      deviceId: req.params.deviceId 
    }).sort({ timestamp: -1 });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;