'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const mockCartItems = [
      {
        customerId: 12,
        gameId    : 1,
      },
      {
        customerId: 13,
        gameId    : 0,
      },
    ];

    await queryInterface.bulkInsert('CartItems', mockCartItems.map(cartItem => ({
      customerId: cartItem.customerId,
      gameId    : cartItem.gameId,
      createdAt : Date(),
      updatedAt : Date(),
    })));
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('CartItems', null, {});
  }
};
