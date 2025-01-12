'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('LibraryItems', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      customerId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "Customers",
          },
          key: "id",
        },
        onDelete: "CASCADE",
      },
      gameId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "Games",
          },
          key: "id",
        },
        onDelete: "CASCADE",
      },
      purchaseDate: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      }
    });

    await queryInterface.addConstraint('LibraryItems', {
      fields: ['gameId', 'customerId'],
      type: 'unique',
      name: 'unique_game_customer_library'
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('LibraryItems');
  }
};