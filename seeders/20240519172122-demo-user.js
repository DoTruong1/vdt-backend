'use strict';

/** @type {import('sequelize-cli').Migration} */
const uuid = require('uuid');

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('users', [{
      id: uuid.v4(),
      name: 'John Doe',
      school: "Đại hoc quốc gia hà nội",
      gender: "nam"
    }], {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * 
     */
    await queryInterface.bulkDelete('users', null, {});
  }
};
