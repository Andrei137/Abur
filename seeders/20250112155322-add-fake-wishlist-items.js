'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const mockWishlistItems = [
      {
        customerId: 12,
        gameId    : 6,
      },
      {
        customerId: 13,
        gameId    : 4,
      },
      {
        customerId: 14,
        gameId    : 2,
      },
    ];

    await queryInterface.bulkInsert("WishlistItems", mockWishlistItems.map(wishlistItem => ({
      createdAt : Date(),
      updatedAt : Date(),
      ...wishlistItem,
    })));
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("WishlistItems", null, {});
  }
};
