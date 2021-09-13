const Sequelize = require('sequelize');
const db = new Sequelize('upTaskNode', 'root', 'rootroot', {
  host: 'localhost',
  dialect: 'mysql',
  operatorsAliases: 0,
  define: {
    timestamps: false
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

module.exports = db;