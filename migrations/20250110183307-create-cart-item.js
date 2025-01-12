'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('CartItems', {
      id: {
        type         : Sequelize.INTEGER,
        allowNull    : false,
        autoIncrement: true,
        primaryKey   : true,
      },
      gameId: {
        type     : Sequelize.INTEGER,
        allowNull: false,
        onDelete : "CASCADE",
        references: {
          key  : "id",
          model: {
            tableName: "Games",
          },
        },
      },
      customerId: {
        type     : Sequelize.INTEGER,
        allowNull: false,
        onDelete: "CASCADE",
        references: {
          key  : "id",
          model: {
            tableName: "Customers",
          },
        },
      },
      createdAt: {
        type     : Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type     : Sequelize.DATE,
        allowNull: false,
      },
    });

    await queryInterface.addConstraint('CartItems', {
      fields: ['gameId', 'customerId'],
      type  : 'unique',
      name  : 'unique_game_customer_cart',
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('CartItems');
  },
};