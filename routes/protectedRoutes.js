const express = require('express');
const router = express.Router();
const permissionMiddleware = require('../middlewares/permissionMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

// Protect route with permission middleware
router.get(
  '/view-dashboard',
  authMiddleware.verifyToken,
  permissionMiddleware.authorizePermission('view_dashboard'),
  (req, res) => {
    res.status(200).json({ message: 'Dashboard content' });
  }
);

module.exports = router;