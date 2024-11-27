const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwt');

module.exports = {
  verifyToken: (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Access denied' });

    try {
      const decoded = jwt.verify(token, jwtConfig.secret);
      req.user = decoded;
      next();
    } catch (err) {
      res.status(403).json({ message: 'Invalid or expired token' });
    }
  },
};
