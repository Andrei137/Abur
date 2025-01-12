'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Games', {
      id: {
        type         : Sequelize.INTEGER,
        allowNull    : false,
        autoIncrement: true,
        primaryKey   : true,
      },
      name: {
        type     : Sequelize.STRING,
        allowNull: false,
        unique   : true,
      },
      price: {
        type     : Sequelize.DOUBLE,
        allowNull: false,
      },
      discountPercentage: {
        type        : Sequelize.INTEGER,
        defaultValue: 0,
      },
      releaseDate: {
        type     : Sequelize.DATE,
        allowNull: false,
      },
      developerId: {
        type      : Sequelize.INTEGER,
        allowNull : false,
        references: {
          key  : 'id',
          model: {
            tableName: 'Developers',
          },
        },
      },
      type: {
        type     : Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        type     : Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Games');
  },
};