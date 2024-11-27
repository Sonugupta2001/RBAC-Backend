const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

// Public Routes
router.post('/register', userController.register);
router.post('/login', userController.login);

// Protected Route Example
router.get(
  '/admin-resource',
  authMiddleware.verifyToken,
  roleMiddleware.authorizeRoles('admin'),
  (req, res) => {
    res.status(200).json({ message: 'Welcome, admin!' });
  }
);

router.post(
  '/register',
  [
    body('username').notEmpty().withMessage('Username is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').isLength({ min: 6 }).withMessage('Password should be at least 6 characters'),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    userController.register(req, res);
  }
);

module.exports = router;
