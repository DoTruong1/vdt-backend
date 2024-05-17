const { Sequelize } = require('sequelize');
// const env = process.env.NODE_ENV || 'development';

const config = require('../config/db.config')

console.log(config.database)
const sequelize = new Sequelize(config.database.database_name, config.database.username, config.database.password, {
  host: config.database.host,
  port: 3306,
  dialect: config.database.dialect /* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */
});

module.exports = sequelize;