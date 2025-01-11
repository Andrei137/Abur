"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const mockReviews = [
      {
        id        : 0,
        customerId: 3,
        gameId    : 0,
        rating    : 9,
        comment   : "Most fun bugs",
        createdAt : Date(),
        updatedAt : Date(),
      },
      {
        id        : 1,
        customerId: 4,
        gameId    : 0,
        rating    : 10,
        comment   : "Great game",
        createdAt : Date(),
        updatedAt : Date(),
      },
      {
        id        : 2,
        customerId: 4,
        gameId    : 1,
        rating    : 8,
        createdAt : Date(),
        updatedAt : Date(),
      },
      {
        id        : 3,
        customerId: 4,
        gameId    : 5,
        rating    : 7,
        comment   : "meh",
        createdAt : Date(),
        updatedAt : Date(),
      },
    ];

    await queryInterface.bulkInsert("Reviews", mockReviews.map(review => ({
      id        : review.id,
      customerId: review.customerId,
      gameId    : review.gameId,
      rating    : review.rating,
      comment   : review.comment,
      createdAt : review.createdAt,
      updatedAt : review.updatedAt,
    })));
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Reviews", null, {});
  },
};
