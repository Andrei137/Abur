'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const mockReviews = [
      {
        id: 0,
        customerId: 10,
        gameId: 0,
        rating: 7,
        comment: 'Great game',
      },
      {
        id: 1,
        customerId: 10,
        gameId: 1,
        rating: 9,
        comment: 'Most fun bugs',
      },
      {
        id: 2,
        customerId: 11,
        gameId: 9,
        rating: 8,
        comment: 'Had fun with my brother Echo',
      },
      {
        id: 3,
        customerId: 11,
        gameId: 2,
        rating: 2,
        comment: 'Cam ciudata viata asta, nu prea mi-a placut',
      },
      {
        id: 4,
        customerId: 12,
        gameId: 4,
        rating: 10,
        comment: 'Played three days without sleep',
      },
      {
        id: 5,
        customerId: 13,
        gameId: 6,
        rating: 10,
        comment: 'Amazing',
      },
      {
        id: 6,
        customerId: 14,
        gameId: 8,
        rating: 6,
        comment: 'We got project with GTA VI before GTA VI',
      },
    ];

    await queryInterface.bulkInsert('Reviews', mockReviews.map(review => ({
      createdAt: Date(),
      updatedAt: Date(),
      ...review,
    })));
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Reviews', null, {});
  },
};
