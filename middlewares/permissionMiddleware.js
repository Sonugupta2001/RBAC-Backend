/*
const { Role, Permission, RolePermission } = require('../models');

module.exports = {
  authorizePermission: (requiredPermission) => async (req, res, next) => {
    try {
      const userRole = req.user.role;

      const role = await Role.findOne({ where: { name: userRole }, include: [Permission] });
      if (!role) return res.status(403).json({ message: 'Role not found' });

      const hasPermission = role.Permissions.some((perm) => perm.name === requiredPermission);
      if (!hasPermission) {
        return res.status(403).json({ message: 'You do not have permission to perform this action' });
      }

      next();
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
}; */

const { Role, Permission, RolePermission } = require('../models');

const authorize = (requiredPermission) => async (req, res, next) => {
  const { roleId } = req.user;

  try {
    const permissions = await RolePermission.findAll({
      where: { roleId },
      include: {
        model: Permission,
        attributes: ['name'],
      },
    });

    const permissionNames = permissions.map((p) => p.Permission.name);
    if (!permissionNames.includes(requiredPermission)) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    next();
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = authorize;