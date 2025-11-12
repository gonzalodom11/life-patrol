const express = require('express');
const router = express.Router();
const Detection = require('../models/Detection');
const User = require('../models/User');
require('dotenv').config();

// POST - Add new sensor reading
router.post('/data', async (req, res) => {
  try {
    const newReading = new Detection(req.body);
    const savedReading = await newReading.save();
    res.status(201).json(savedReading);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// GET - Get all sensor data
router.get('/data', async (req, res) => {
  try {
    const data = await Detection.find()
      .sort({ timestamp: -1 })
      .limit(100);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET - Get unique tags per category
router.get('/tags/:category', async (req, res) => {
  try {
    const category = req.params.category; // 'wildlife', 'intruder', or 'other'
    const tags = await Detection.distinct('tags', { category });
    res.json(tags);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET - Get data by device ID
router.get('/data/:deviceId', async (req, res) => {
  try {
    const data = await Detection.find({
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
    const data = await Detection.findOne({
      deviceId: req.params.deviceId
    }).sort({ timestamp: -1 });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// UPDATE - Update tags for a detection
router.put('/data/:id/tags', async (req, res) => {
  try {
    const detectionId = req.params.id;

    if (!detectionId) {
      return res.status(400).json({ error: 'Missing detection id in params' });
    }

    const tags = req.body.tags;
    if (!Array.isArray(tags)) {
      return res.status(400).json({ error: 'tags must be an array' });
    }

    const updatedDetection = await Detection.findByIdAndUpdate(
      detectionId,
      { $set: { tags } },
      { new: true, runValidators: true, context: 'query' }
    ).exec();

    if (!updatedDetection) {
      return res.status(404).json({ error: `Detection ${detectionId} not found` });
    }

    // return the updated document to the client
    return res.json(updatedDetection);
  } catch (err) {
    // handle errors (validation, DB, etc.)
    console.error("Failed updating detection tags:", err);
    return res.status(500).json({ error: err.message || 'Internal server error' });
  }
}
);

module.exports = router;