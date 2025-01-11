'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const mockCartItems = [
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

    await queryInterface.bulkInsert("CartItems", mockCartItems.map(cartItem => ({
      customerId: cartItem.customerId,
      gameId    : cartItem.gameId,
      createdAt : cartItem.createdAt,
      updatedAt : cartItem.updatedAt,
    })));
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("CartItems", null, {});
  }
};