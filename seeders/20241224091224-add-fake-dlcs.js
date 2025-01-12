'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const mockDLCs = [
      {
        id         : 10,
        name       : 'God Of War Ragnarok Valhalla',
        price      : 0,
        releaseDate: new Date('2024-08-20'),
      },
      {
        id                : 11,
        name              : 'Cyberpunk 2077 Phantom Liberty',
        discountPercentage: 40,
        price             : 29.99,
        releaseDate       : new Date('2023-09-26'),
      },
      {
        id         : 12,
        name       : 'Life is Strange 2 Mascot Bundle',
        price      : 1.99,
        releaseDate: new Date('2018-09-27'),
      },
      {
        id         : 13,
        name       : 'The Legend of Zelda: Breath of the Wild Expansion Pass',
        price      : 19.99,
        releaseDate: new Date('2017-06-30'),
      },
      {
        id         : 14,
        name       : 'Pronty: Neptune’s Hall',
        price      : 0,
        releaseDate: new Date('2022-01-24'),
      },
      {
        id         : 15,
        name       : 'Devil May Cry 5: Playable Character Vergil',
        price      : 4.95,
        releaseDate: new Date('2020-12-15'),
      },
      {
        id         : 16,
        name       : 'Elden Ring: Shadow of the Erdtree',
        price      : 39.99,
        releaseDate: new Date('2024-06-21'),
      },
      {
        id         : 17,
        name       : 'Death Stranding Director\'s Cut',
        price      : 9.99,
        releaseDate: new Date('2022-01-24'),
      },
      {
        id         : 18,
        name       : 'GTA VI 1000000 Cash',
        price      : 0,
        releaseDate: new Date('2035-01-24'),
      },
      {
        id         : 19,
        name       : 'Soma Safe Mode',
        price      : 0,
        releaseDate: new Date('2015-09-22'),
      },
    ];

    await queryInterface.bulkInsert('Games', mockDLCs.map(dlc => ({
      developerId: dlc.id - 10,
      type       : 'dlc',
      createdAt  : Date(),
      updatedAt  : Date(),
      ...dlc,
    })));

    await queryInterface.bulkInsert('DLCs', mockDLCs.map(dlc => ({
      id        : dlc.id,
      baseGameId: dlc.id - 10,
    })));
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('DLCs', null, {});
    await queryInterface.bulkDelete('Games', null, {});
  }
};
