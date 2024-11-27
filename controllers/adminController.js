const { Role, Permission, RolePermission } = require('../models');

module.exports = {
  createRole: async (req, res) => {
    try {
      const { name } = req.body;

      const existingRole = await Role.findOne({ where: { name } });
      if (existingRole) return res.status(400).json({ message: 'Role already exists' });

      const role = await Role.create({ name });
      res.status(201).json({ message: 'Role created successfully', role });
    }
    catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  assignRoleToUser: async (req, res) => {
    try {
      const { userId, roleId } = req.body;

      const user = await User.findByPk(userId);
      const role = await Role.findByPk(roleId);

      if (!user) return res.status(404).json({ message: 'User not found' });
      if (!role) return res.status(404).json({ message: 'Role not found' });

      user.role = role.name;
      await user.save();
      
      res.status(200).json({ message: 'Role assigned to user successfully'});
    }
    catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  assignPermissionToRole: async (req, res) => {
    try {
      const { roleId, permissionId } = req.body;

      const role = await Role.findByPk(roleId);
      const permission = await Permission.findByPk(permissionId);

      if (!role) return res.status(404).json({ message: 'Role not found' });
      if (!permission) return res.status(404).json({ message: 'Permission not found'});

      await RolePermission.create({ roleId, permissionId });
      res.status(200).json({ message: 'Permission assigned to role successfully'});
    }
    catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  listAllUsers: async (req, res) => {
    try {
      const users = await User.findAll({
        include: { model: Role },
      });
      res.status(200).json({ users });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  changeUserRole: async (req, res) => {
    try {
      const { userId, roleId } = req.body;
  
      const user = await User.findByPk(userId);
      const role = await Role.findByPk(roleId);
  
      if (!user) return res.status(404).json({ message: 'User not found' });
      if (!role) return res.status(404).json({ message: 'Role not found' });
  
      user.roleId = roleId;
      await user.save();
  
      res.status(200).json({ message: 'Role updated successfully', user });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
  
  
};
