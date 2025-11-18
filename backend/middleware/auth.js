const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.replace('Bearer ', '');
  
  const apiSecret = process.env.API_SECRET;
  let authorized = false;

  if (token && apiSecret) {
    const tokenBuffer = Buffer.from(token);
    const secretBuffer = Buffer.from(apiSecret);
    if (tokenBuffer.length === secretBuffer.length) {
      authorized = crypto.timingSafeEqual(tokenBuffer, secretBuffer);
    }
  }

  if (authorized) {
    next();
  } else {
    res.status(401).json({ error: 'Unauthorized' });
  }
};

module.exports = authenticate;