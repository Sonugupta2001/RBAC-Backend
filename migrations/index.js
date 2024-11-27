const { Sequelize } = require('sequelize');
const { sequelize } = require('../models');

(async () => {
  try {
    await sequelize.sync();
    console.log('Migrations completed successfully!');
    process.exit(0);
  } catch (err) {
    console.error('Migration failed:', err);
    process.exit(1);
  }
})();
