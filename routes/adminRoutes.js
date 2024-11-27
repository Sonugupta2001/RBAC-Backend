const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

// Protected Routes for Admins
router.post(
  '/roles',
  authMiddleware.verifyToken,
  roleMiddleware.authorizeRoles('admin'),
  adminController.createRole
);

router.post(
    '/users/assign-role',
    authMiddleware.verifyToken,
    roleMiddleware.authorizeRoles('admin'),
    adminController.assignRoleToUser
);

router.post(
  '/roles/assign-permission',
  authMiddleware.verifyToken,
  roleMiddleware.authorizeRoles('admin'),
  adminController.assignPermissionToRole
);

module.exports = router;