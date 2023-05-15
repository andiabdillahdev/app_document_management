"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn("Users", "role", {
      type: Sequelize.STRING,
      allowNull: false,
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn("Users", "role", {
      type: Sequelize.STRING,
      allowNull: false,
    });
  },
};
