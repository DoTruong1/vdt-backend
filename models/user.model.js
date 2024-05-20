const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require("../sequelize/index")
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
    timestamps: true,
    indexes: [{ unique: true, fields: ["id"] }],
  }
);

module.exports = User

