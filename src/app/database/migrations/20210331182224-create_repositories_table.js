'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('Repositories', {
      id: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey:true
      },
      name: Sequelize.STRING(50),
      local: Sequelize.STRING(100),
      description: Sequelize.STRING(600),
      slug: Sequelize.STRING(100)
    })
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Repositories');
  }
};
