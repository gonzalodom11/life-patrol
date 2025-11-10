const mongoose = require('mongoose');

const sensorDetectionSchema = new mongoose.Schema({
  deviceId: {
    type: String,
    required: true,
    index: true
  },
  temperature: {
    type: Number,
    required: true,
    min: -50,
    max: 100
  },
  humidity: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  },
  location: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now,
    index: true
  },
  tags: {
    type: [String],
    default: []
  },
  confidence: {
    type: Number,
    min: 0,
    max: 100
  },
  category: {
    type: String,
    enum: ['wildlife', 'intruder', 'other'],
    default: 'wildlife'
  },
  imageUrl: {
    type: String
  },
}, {
  timestamps: true // Adds createdAt and updatedAt automatically
});

module.exports = mongoose.model('Detection', sensorDetectionSchema);