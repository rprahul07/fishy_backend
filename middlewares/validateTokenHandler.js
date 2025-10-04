// middlewares/firebaseAuth.js
const { auth } = require('../config/dbConnection');

async function verifyFirebaseToken(req, res, next) {
  const token = req.headers.authorization?.split('Bearer ')[1];

  if (!token) return res.status(401).json({ error: 'No token provided' });

  try {
    const decodedToken = await auth.verifyIdToken(token);
    req.user = decodedToken; // attach decoded token to request
    next();
  } catch (err) {
    res.status(401).json({ error: 'Invalid or expired token' });
  }
}

module.exports = verifyFirebaseToken;
