const { User, Role, Permission } = require('../models');

module.exports = {
  getUserProfile: async (req, res) => {
    try {
      const { id } = req.user;

      const user = await User.findByPk(id, {
        include: {
          model: Role,
          include: { model: Permission },
        },
      });

      if (!user) return res.status(404).json({ message: 'User not found' });

      res.status(200).json({ user });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  updateUserProfile: async (req, res) => {
    try {
      const { id } = req.user;
      const { username, email } = req.body;
  
      const user = await User.findByPk(id);
      if (!user) return res.status(404).json({ message: 'User not found' });
  
      await user.update({ username, email });
      res.status(200).json({ message: 'Profile updated successfully', user });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  deleteUser: async (req, res) => {
    try {
      const { id } = req.user;
  
      const user = await User.findByPk(id);
      if (!user) return res.status(404).json({ message: 'User not found' });
  
      await user.destroy();
      res.status(200).json({ message: 'User deleted successfully' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  changePassword: async (req, res) => {
    try {
      const { id } = req.user;
      const { currentPassword, newPassword } = req.body;
  
      const user = await User.findByPk(id);
      if (!user || !(await user.validPassword(currentPassword))) {
        return res.status(400).json({ message: 'Current password is incorrect' });
      }
  
      user.password = newPassword;
      await user.save();
  
      res.status(200).json({ message: 'Password updated successfully' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
};
