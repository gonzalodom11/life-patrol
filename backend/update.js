// updateExistingDocs.js
const mongoose = require('mongoose');
const Detection = require('./models/Detection'); // require the Detection model from backend/models
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

(async () => {
  try {
    const result = await Detection.updateMany(
      { imageUrl: { $exists: false } },
      { $set: { imageUrl: null } }
    );
    console.log(`✅ Updated ${result.modifiedCount} documents`);
  } catch (err) {
    console.error('❌ Error updating documents:', err);
  } finally {
    mongoose.connection.close();
  }
})();
