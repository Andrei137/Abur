'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const mockGames = [
      {
        id         : 0,
        developerId: 0,
        name       : 'God of War Ragnarok',
        price      : 59.99,
        releaseDate: new Date('2024-09-19'),
      },
      {
        id         : 1,
        name       : 'Cyberpunk 2077',
        price      : 59.99,
        releaseDate: new Date('2020-12-10'),
      },
      {
        id         : 2,
        name       : 'Life is Strange 2',
        price      : 31.96,
        releaseDate: new Date('2018-09-26'),
      },
      {
        id                : 3,
        name              : 'The Legend of Zelda: Breath of the Wild',
        price             : 59.99,
        discountPercentage: 10,
        releaseDate       : new Date('2017-03-03'),
      },
      {
        id                : 4,
        name              : 'Pronty',
        price             : 14.99,
        discountPercentage: 75,
        releaseDate       : new Date('2021-11-19'),
      },
      {
        id         : 5,
        name       : 'Devil May Cry 5',
        price      : 29.99,
        releaseDate: new Date('2023-04-24'),
      },
      {
        id                : 6,
        name              : 'Elden Ring',
        discountPercentage: 27,
        price             : 59.99,
        releaseDate       : new Date('2022-02-25'),
      },
      {
        id                : 7,
        name              : 'Death Stranding',
        discountPercentage: 50,
        price             : 9.99,
        releaseDate       : new Date('2022-03-29'),
      },
      {
        id                : 8,
        name              : 'GTA VI',
        discountPercentage: 100,
        price             : 129.99,
        releaseDate       : new Date('2030-10-04'),
      },
      {
        id                : 9,
        name              : 'Soma',
        discountPercentage: 90,
        price             : 28.99,
        releaseDate       : new Date('2015-09-22'),
      },
      {
        id                : 20,
        developerId       : 6,
        name              : 'Sekiro Shadows Die Twice',
        discountPercentage: 20,
        price             : 59.99,
        releaseDate       : new Date('2019-03-22'),
      }
    ];

    await queryInterface.bulkInsert('Games', mockGames.map(game => ({
      developerId: game.id,
      type       : 'game',
      createdAt  : new Date(),
      updatedAt  : new Date(),
      ...game,
    })));
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Games', null, {});
  },
};
