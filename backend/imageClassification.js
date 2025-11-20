const fetch = require('node-fetch');
const Detection = require('../models/Detection');

module.exports = async function classifyImageAsync(detection) {
  const endpoint = `https://detect.roboflow.com/${process.env.ROBOFLOW_MODEL}?api_key=${process.env.ROBOFLOW_API_KEY}&image=${encodeURIComponent(detection.imageUrl)}`;
  const response = await fetch(endpoint);
  if (!response.ok) throw new Error('Roboflow error ' + response.status);
  const data = await response.json();
  const pred = data?.predictions?.[0]?.class || 'unknown';
  await Detection.findByIdAndUpdate(detection._id, { species: pred, tags: [pred] });
  console.log('[AI] Predicted', pred);
};
