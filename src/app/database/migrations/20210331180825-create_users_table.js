'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('Users', {
      id: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey:true
      },

      name: Sequelize.STRING(50),

      email: {
          type: Sequelize.STRING(50),
          allowNull: false,
          unique: true
      },

      local: Sequelize.STRING(100),

      username: {
          type: Sequelize.STRING(20),
          allowNull: false,
          unique: true
      },

      bio: Sequelize.STRING(600),

      avatar: Sequelize.STRING(100)
    })

  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Users');
  }
};
