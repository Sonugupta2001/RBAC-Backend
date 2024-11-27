const { User, Role } = require('../models');
const jwt = require('jsonwebtoken');

module.exports = {
  register: async (req, res) => {
    try {
      const { username, email, password, roleId } = req.body;
      if (!username || !email || !password || !roleId) {
        return res.status(400).json({ message: 'All fields are required' });
      }

      const user = await User.create({ username, email, password, roleId });
      const token = jwt.sign({ id: user.id, roleId: user.roleId }, process.env.JWT_SECRET, { expiresIn: '1h' });

      res.status(201).json({ token });
    }
    catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  authenticate: (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'No token provided' });

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      next();
    }
    catch (err) {
      res.status(403).json({ message: 'Invalid token' });
    }
  },

  authorize: (permissions) => async (req, res, next) => {
    try {
      const { roleId } = req.user;
      const role = await Role.findByPk(roleId, { include: 'Permissions' });

      if (!role) return res.status(403).json({ message: 'Access denied' });
      const hasPermission = role.Permissions.some((perm) => permissions.includes(perm.name));
      if (!hasPermission) return res.status(403).json({ message: 'Access denied' });

      next();
    }
    catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ where: { email } });
      if (!user || !(await user.validPassword(password))) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      const token = jwt.sign({ id: user.id, roleId: user.roleId }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.status(200).json({ token });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
};