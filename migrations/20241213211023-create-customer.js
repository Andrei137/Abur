'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Customers', {
      id: {
        type         : Sequelize.INTEGER,
        allowNull    : false,
        autoIncrement: true,
        primaryKey   : true,
        onDelete     : 'CASCADE',
        references: {
          model: {
            tableName: 'Users',
          },
          key: 'id',
        },
      },
      firstName: {
        type: Sequelize.STRING,
      },
      lastName: {
        type: Sequelize.STRING,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Customers');
  },
};