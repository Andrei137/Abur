'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('WishlistItems', {
      id: {
        type         : Sequelize.INTEGER,
        allowNull    : false,
        autoIncrement: true,
        primaryKey   : true,
      },
      customerId: {
        type     : Sequelize.INTEGER,
        allowNull: false,
        onDelete : "CASCADE",
        references: {
          key  : "id",
          model: {
            tableName: "Customers",
          },
        },
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
      createdAt: {
        type     : Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type     : Sequelize.DATE,
        allowNull: false,
      }
    });

    await queryInterface.addConstraint('WishlistItems', {
      fields: ['gameId', 'customerId'],
      type  : 'unique',
      name  : 'unique_game_customer_wishlist',
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('WishlistItems');
  },
};