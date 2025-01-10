"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const mockLibraryItems = [
      {
        customerId: 3,
        gameId: 0,
        purchaseDate: Date(),
        createdAt: Date(),
        updatedAt: Date(),
      },
      {
        customerId: 3,
        gameId: 1,
        purchaseDate: Date(),
        createdAt: Date(),
        updatedAt: Date(),
      },
      {
        customerId: 3,
        gameId: 4,
        purchaseDate: Date(),
        createdAt: Date(),
        updatedAt: Date(),
      },
      {
        customerId: 4,
        gameId: 2,
        purchaseDate: Date(),
        createdAt: Date(),
        updatedAt: Date(),
      },
    ];

    await queryInterface.bulkInsert(
      "LibraryItems",
      mockLibraryItems.map((libraryItem) => ({
        customerId: libraryItem.customerId,
        gameId: libraryItem.gameId,
        purchaseDate: libraryItem.purchaseDate,
        createdAt: libraryItem.createdAt,
        updatedAt: libraryItem.updatedAt,
      }))
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
