const jwt = require('jsonwebtoken');
const User = require('../models/User');
exports.protect = async (req, res, next) => {
  try {
    const h = req.headers.authorization;
    if (!h) return res.status(401).json({ message: 'No token' });
    const t = h.split(' ')[1];
    const d = jwt.verify(t, process.env.JWT_SECRET);
    req.user = await User.findById(d.id).select('-password');
    next();
  } catch (e) {
    res.status(401).json({ message: 'Invalid token' });
  }
};
