// seed.js
const mongoose = require('mongoose');
const Detection = require('models/Detection'); // adjust the path to your model file

// 1. Connect to MongoDB Atlas
mongoose.connect('mongodb+srv://<username>:<password>@cluster0.mongodb.net/iot_project?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ Connected to MongoDB Atlas'))
.catch(err => console.error('❌ MongoDB connection error:', err));

// 2. Example data to populate
const sampleData = [
  {
    deviceId: 'raspberry-pi-01',
    temperature: 22.5,
    humidity: 60,
    location: 'Garden Zone A',
    tags: ['cat', 'motion'],
    confidence: 95,
    category: 'wildlife',
  },
  {
    deviceId: 'raspberry-pi-02',
    temperature: 19.3,
    humidity: 70,
    location: 'Backyard',
    tags: ['human', 'intrusion'],
    confidence: 88,
    category: 'intruder',
  },
  {
    deviceId: 'esp32-sensor-01',
    temperature: 24.1,
    humidity: 55,
    location: 'Park Entrance',
    tags: ['bird'],
    confidence: 90,
    category: 'wildlife',
  },
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
