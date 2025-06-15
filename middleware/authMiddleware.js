const jwt = require('jsonwebtoken');
const User = require('../models/User');

// ✅ Protect middleware – Authenticates the user
const protect = async (req, res, next) => {
  let token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ msg: 'No token, not authorized' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select('-password');
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token invalid or expired' });
  }
};

// ✅ Admin middleware – Authorizes only admins
const admin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ msg: 'Admin access only' });
  }
};

module.exports = { protect, admin };
