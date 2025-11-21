const Detection = require('./models/Detection');

module.exports = async function classifyImageAsync(detection) {
  const endpoint = `https://detect.roboflow.com/${process.env.ROBOFLOW_MODEL}?api_key=${process.env.ROBOFLOW_API_KEY}&image=${encodeURIComponent(detection.imageUrl)}`;
  const response = await fetch(endpoint);
  if (!response.ok) throw new Error('Roboflow error ' + response.status);
  const data = await response.json();
  const pred = data?.predictions?.[0]?.class || 'unknown';
  let categ = 'other';
  if(pred === 'human') {
    categ = 'intruder';
  }
  else {
    categ = 'wildlife';
  }
  const confid = data?.predictions?.[0]?.confidence || 0;
  if(pred === 'unknown'){
  await Detection.findByIdAndUpdate(detection._id, { category: categ, confidence: confid * 100, tags: [] });
  }
  await Detection.findByIdAndUpdate(detection._id, { category: categ, confidence: confid * 100, tags: [pred] });

  console.log('[AI] Predicted', pred);
};
