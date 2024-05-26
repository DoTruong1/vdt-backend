'use strict';
// import { DataTypes } from '@sequelize/core';
const { DataTypes } = require('sequelize')
/** @type {import('sequelize-cli').Migration} */
// Import the built-in data types
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
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
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      birthDay: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: "Không có dữ liệu"
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      nation: {
        type: DataTypes.STRING,
        allowNull: true
      },
      createdAt: {
        allowNull: true,
        type: Sequelize.DATE,
        default: Date.now()
      },
      updatedAt: {
        allowNull: true,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  }
};