// seed.js
const mongoose = require('mongoose');
const Detection = require('./models/Detection'); // require the Detection model from backend/models
require('dotenv').config();

// 1. Connect to MongoDB Atlas
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ Connected to MongoDB Atlas'))
.catch(err => console.error('❌ MongoDB connection error:', err));

// 2. Example data to populate (expanded)
const sampleData = [
  // wildlife detections
  { deviceId: 'raspberry-pi-01', temperature: 22.5, humidity: 60, location: 'Garden Zone A', tags: ['cat', 'motion'], confidence: 95, category: 'wildlife', timestamp: new Date('2025-01-05T08:15:00Z') },
  { deviceId: 'esp32-sensor-02', temperature: 21.7, humidity: 50, location: 'Garden Zone A', tags: ['deer'], confidence: 85, category: 'wildlife', timestamp: new Date('2025-02-14T22:30:00Z') },
  { deviceId: 'esp8266-04', temperature: 27.8, humidity: 40, location: 'Warehouse Roof', tags: ['bird', 'nest'], confidence: 98, category: 'wildlife', timestamp: new Date('2025-03-03T12:00:00Z') },
  { deviceId: 'raspberry-pi-05', temperature: 40.0, humidity: 20, location: 'Garden Zone A', tags: ['animal'], confidence: 70, category: 'wildlife', timestamp: new Date('2025-04-10T16:45:00Z') },
  { deviceId: 'camera-trap-01', temperature: 14.2, humidity: 66, location: 'North Field', tags: ['fox'], confidence: 82, category: 'wildlife', timestamp: new Date('2025-05-20T01:30:00Z') },
  { deviceId: 'camera-trap-02', temperature: 12.8, humidity: 72, location: 'Pond Edge', tags: ['duck'], confidence: 88, category: 'wildlife', timestamp: new Date('2025-06-11T09:10:00Z') },

  // intruder / human detections
  { deviceId: 'raspberry-pi-02', temperature: 19.3, humidity: 70, location: 'Backyard', tags: ['human', 'intrusion'], confidence: 88, category: 'intruder', timestamp: new Date('2025-07-04T03:20:00Z') },
  { deviceId: 'nest-cam-03', temperature: 18.0, humidity: 45, location: 'Front Gate', tags: ['person', 'night'], confidence: 92, category: 'intruder', timestamp: new Date('2025-07-15T23:45:00Z') },
  { deviceId: 'mobile-sensor-01', temperature: 20.0, humidity: 48, location: 'Garden Zone A', tags: ['person', 'vehicle'], confidence: 78, category: 'intruder', timestamp: new Date('2025-08-02T14:05:00Z') },
  { deviceId: 'lora-node-01', temperature: 15.3, humidity: 65, location: 'Garden Zone A', tags: ['cat', 'human'], confidence: 60, category: 'intruder', timestamp: new Date('2025-08-18T19:30:00Z') },
  { deviceId: 'doorbell-cam-01', temperature: 17.6, humidity: 50, location: 'Side Door', tags: ['person'], confidence: 99, category: 'intruder', timestamp: new Date('2025-09-01T12:00:00Z') },

  // other / environmental / edge cases
  { deviceId: 'arduino-01', temperature: -5.0, humidity: 30, location: 'Storage Shed', tags: ['cat'], confidence: 40, category: 'other', timestamp: new Date('2025-09-10T06:00:00Z') },
  { deviceId: 'weather-station-01', temperature: 5.6, humidity: 90, location: 'Garden Zone A', tags: ['cat'], confidence: 50, category: 'other', timestamp: new Date('2025-09-21T13:25:00Z') },
  { deviceId: 'esp32-sensor-03', temperature: 23.0, humidity: 58, location: 'Playground', tags: ['child', 'activity'], confidence: 89, category: 'other', timestamp: new Date('2025-10-02T17:45:00Z') },
  { deviceId: 'esp32-sensor-04', temperature: 0.0, humidity: 100, location: 'Garden Zone A', tags: ['cat'], confidence: 100, category: 'other', timestamp: new Date('2025-10-15T12:00:00Z') },

  // more varied entries for load and testing
  { deviceId: 'raspberry-pi-06', temperature: 25.1, humidity: 55, location: 'Greenhouse', tags: ['wildhog'], confidence: 65, category: 'wildlife', timestamp: new Date('2025-10-21T05:30:00Z') },
  { deviceId: 'esp32-sensor-05', temperature: 26.4, humidity: 49, location: 'Garden Zone B', tags: ['cat'], confidence: 85, category: 'wildlife', timestamp: new Date('2025-11-02T11:00:00Z') },
  { deviceId: 'raspberry-pi-07', temperature: 29.0, humidity: 35, location: 'Roof', tags: ['bird'], confidence: 90, category: 'wildlife', timestamp: new Date('2025-11-15T09:45:00Z') },
  { deviceId: 'camera-trap-03', temperature: 11.0, humidity: 80, location: 'Woodland', tags: ['deer'], confidence: 93, category: 'wildlife', timestamp: new Date('2025-11-20T20:10:00Z') },
  { deviceId: 'camera-trap-04', temperature: 10.5, humidity: 82, location: 'Woodland', tags: ['boar'], confidence: 60, category: 'wildlife', timestamp: new Date('2025-12-01T07:25:00Z') },
  { deviceId: 'security-cam-01', temperature: 21.0, humidity: 50, location: 'Barn', tags: ['vehicle', 'person'], confidence: 45, category: 'intruder', timestamp: new Date('2025-12-05T02:40:00Z') },
  { deviceId: 'sensor-edge-01', temperature: 18.3, humidity: 47, location: 'Gate', tags: ['cat'], confidence: 10, category: 'other', timestamp: new Date('2025-12-12T18:55:00Z') },
  { deviceId: 'sensor-edge-02', temperature: 18.4, humidity: 49, location: 'Garden Zone B', tags: ['cat'], confidence: 0, category: 'other', timestamp: new Date('2025-12-24T23:59:00Z') },
  { deviceId: 'long-history-01', temperature: 16.7, humidity: 55, location: 'Garden Zone B', tags: ['deer'], confidence: 75, category: 'other', timestamp: new Date('2025-06-01T12:00:00Z') },
  { deviceId: 'recent-burst-01', temperature: 19.9, humidity: 44, location: 'Garden Zone C', tags: ['dog'], confidence: 88, category: 'wildlife', timestamp: new Date('2025-12-31T23:59:59Z') }
];

// 3. Insert data
Detection.insertMany(sampleData)
  .then(() => {
    console.log('🌱 Database successfully populated!');
    mongoose.connection.close();
  })
  .catch(err => {
    console.error('❌ Error inserting data:', err);
    mongoose.connection.close();
  });
