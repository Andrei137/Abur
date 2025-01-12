'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const mockWishlistItems = [
      {
        customerId: 3,
        gameId    : 2,
        createdAt : Date(),
        updatedAt : Date(),
      },
      {
        customerId: 4,
        gameId    : 0,
        createdAt : Date(),
        updatedAt : Date(),
      },
      {
        customerId: 4,
        gameId    : 1,
        createdAt : Date(),
        updatedAt : Date(),
      },
      {
        customerId: 3,
        gameId    : 5,
        createdAt : Date(),
        updatedAt : Date(),
      },
    ];

    await queryInterface.bulkInsert("WishlistItems", mockWishlistItems.map(wishlistItem => ({
      customerId: wishlistItem.customerId,
      gameId    : wishlistItem.gameId,
      createdAt : wishlistItem.createdAt,
      updatedAt : wishlistItem.updatedAt,
    })));
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
