'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Developers', {
      id: {
        type         : Sequelize.INTEGER,
        allowNull    : false,
        autoIncrement: true,
        primaryKey   : true,
        onDelete     : 'CASCADE',
        references   : {
          key  : 'id',
          model: {
            tableName: 'Users',
          },
        },
      },
      studio: {
        type     : Sequelize.STRING,
        allowNull: false,
        unique   : true,
      },
      website: {
        type: Sequelize.STRING,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Developers');
  },
};
