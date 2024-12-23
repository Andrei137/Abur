'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const mockGames = [
      {
        id: 0,
        developerId: 1,
        name: 'Cyberpunk 2077',
        price: 59.99,
        releaseDate: new Date('2020-12-10'),
        type: 'game',
        createdAt: Date(),
        updatedAt: Date(),
      },
      {
        id: 1,
        developerId: 2,
        name: 'Life is Strange 2',
        price: 31.96,
        releaseDate: new Date('2018-09-26'),
        type: 'game',
        createdAt: Date(),
        updatedAt: Date(),
      },
      {
        id: 2,
        developerId: 0,
        name: 'Concord',
        price: 39.99,
        releaseDate: new Date('2024-08-20'),
        type: 'game',
        createdAt: Date(),
        updatedAt: Date(),
      },
    ];

    await queryInterface.bulkInsert('Games', mockGames.map(game => {
      return {
        ...game
      }
    }), {});
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
