const { sequelize } = require('../models');
const { User, Role, Permission, RolePermission } = sequelize.models;

(async () => {
  try {
    // Create roles
    const adminRole = await Role.create({ name: 'admin' });
    const userRole = await Role.create({ name: 'user' });

    // Create permissions
    const manageUsers = await Permission.create({ name: 'manage_users' });
    const viewDashboard = await Permission.create({ name: 'view_dashboard' });

    // Assign permissions to roles
    await RolePermission.create({ roleId: adminRole.id, permissionId: manageUsers.id });
    await RolePermission.create({ roleId: adminRole.id, permissionId: viewDashboard.id });
    await RolePermission.create({ roleId: userRole.id, permissionId: viewDashboard.id });

    console.log('Seed data added successfully!');
    process.exit(0);
  } catch (err) {
    console.error('Seeding failed:', err);
    process.exit(1);
  }
})();