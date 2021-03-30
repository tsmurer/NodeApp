'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('user', 
      {
        id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true
        },

        name: {
          type: Sequelize.STRING,
          allowNull: false
        },
        email: {
          type: Sequelize.STRING,
          allowNull: false
        },
        followers: {
          type: Sequelize.INTEGER,
          allowNull: true
        },
        following: {
          type: Sequelize.INTEGER,
          allowNull: true
        }
      });
  },

  down: async (queryInterface, Sequelize) => {

  }
};
