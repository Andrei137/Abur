'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('DLCs', {
      id: {
        type         : Sequelize.INTEGER,
        allowNull    : false,
        autoIncrement: true,
        primaryKey   : true,
        references: {
          model: {
            tableName: 'Games',
          },
          key: 'id',
        },
        onDelete: 'CASCADE'
      },
      baseGameId: {
        type      : Sequelize.INTEGER,
        allowNull : false,
        references: {
          key  : 'id',
          model: {
            tableName: 'Games',
          },
        },
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('DLCs');
  },
};
