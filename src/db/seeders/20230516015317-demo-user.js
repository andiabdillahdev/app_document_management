"use strict";
const bcrypt = require("bcrypt");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          nama: "Admin",
          email: "admin@gmail.com",
          password: await bcrypt.hash("admin12345", 10),
          verified: true,
          active: true,
          role: "admin",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nama: "Andi Abdillah",
          email: "andiabdillah004@gmail.com",
          password: await bcrypt.hash("user12345", 10),
          verified: true,
          active: true,
          role: "user",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
