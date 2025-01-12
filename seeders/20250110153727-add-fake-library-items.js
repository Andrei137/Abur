"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const mockLibraryItems = [
      {
        customerId: 10,
        gameId: 0,
      },
      {
        customerId: 10,
        gameId: 1,
      },
      {
        customerId: 11,
        gameId: 9,
      },
      {
        customerId: 11,
        gameId: 2,
      },
      {
        customerId: 12,
        gameId: 4,
      },
      {
        customerId: 12,
        gameId: 5,
      },
      {
        customerId: 13,
        gameId: 6,
      },
      {
        customerId: 13,
        gameId: 3,
      },
      {
        customerId: 14,
        gameId: 8,
      },
      {
        customerId: 14,
        gameId: 7,
      },
    ];

    await queryInterface.bulkInsert("LibraryItems", mockLibraryItems.map(libraryItem => ({
      purchaseDate: Date(),
      createdAt: Date(),
      updatedAt: Date(),
      ...libraryItem,
    })));
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("LibraryItems", null, {});
  },
};
