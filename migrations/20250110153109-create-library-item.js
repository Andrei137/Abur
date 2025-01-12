'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('LibraryItems', {
      id: {
        type         : Sequelize.INTEGER,
        allowNull    : false,
        autoIncrement: true,
        primaryKey   : true,
      },
      customerId: {
        allowNull : false,
        type      : Sequelize.INTEGER,
        onDelete  : "CASCADE",
        references: {
          key  : "id",
          model: {
            tableName: "Customers",
          },
        },
      },
      gameId: {
        type      : Sequelize.INTEGER,
        allowNull : false,
        onDelete  : "CASCADE",
        references: {
          key: "id",
          model: {
            tableName: "Games",
          },
        },
      },
      purchaseDate: {
        type     : Sequelize.DATE,
        allowNull: false,
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

    await queryInterface.addConstraint('LibraryItems', {
      fields: ['gameId', 'customerId'],
      type  : 'unique',
      name  : 'unique_game_customer_library',
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('LibraryItems');
  },
};