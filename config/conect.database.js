const Sequelize = require('sequelize');
const AllModels = require('../models');
// const { DB_CONNECTION_SUCCESSFUL, DB_CONNECTION_UNSUCCESSFUL } = require('../helpers/messages');

let sequelize;

exports.dbConnect = async () => {
  const config = require('./config')

  console.log(config.database)
  sequelize = new Sequelize(config.database.database, config.database.username, config.database.password, {
    host: config.development.host,
    port: 3306,
    dialect: config.development.dialect /* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */
  });

  sequelize.authenticate().then(() => {
    console.info(DB_CONNECTION_SUCCESSFUL);
  }).catch((err) => {
    console.error(DB_CONNECTION_UNSUCCESSFUL, err.message);
  });
};

exports.dbDisconnect = async () => {
  await AllModels.sequelize.close();
};