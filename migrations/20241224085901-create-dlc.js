'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('DLCs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'Games',
          },
          key: 'id',
        },
        onDelete: 'CASCADE'
      },
      baseGameId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: {
            tableName: 'Games',
          },
          key: 'id',
        }
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('DLCs');
  }
};
