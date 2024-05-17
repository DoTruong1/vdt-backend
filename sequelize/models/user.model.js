const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require("../index")
const User = sequelize.define('User',

  {
    id: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    school: {
      type: DataTypes.STRING,
      default: "Không có dữ liệu"
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }
  , {
    timestamps: false,
    indexes: [{ unique: true, fields: ["id"] }],
  }
);

module.exports = {
  User,
  sequelize,
};