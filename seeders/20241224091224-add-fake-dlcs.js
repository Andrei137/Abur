'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const mockDLCs = [
      {
        id         : 3,
        developerId: 1,
        name       : 'Cyberpunk 2077 Phantom Liberty',
        price      : 29.99,
        releaseDate: new Date('2023-09-26'),
        type       : 'dlc',
        createdAt  : Date(),
        updatedAt  : Date(),
        baseGameId : 0,
      },
      {
        id         : 4,
        developerId: 2,
        name       : 'Life is Strange 2 Mascot Bundle',
        price      : 1.99,
        releaseDate: new Date('2018-09-27'),
        type       : 'dlc',
        createdAt  : Date(),
        updatedAt  : Date(),
        baseGameId : 1,
      },
      {
        id         : 5,
        developerId: 0,
        name       : 'God Of War Ragnarok Valhalla',
        price      : 0,
        releaseDate: new Date('2024-08-20'),
        type       : 'dlc',
        createdAt  : Date(),
        updatedAt  : Date(),
        baseGameId : 2,
      },
    ];

    await queryInterface.bulkInsert('Games', mockDLCs.map(dlc => ({
      id         : dlc.id,
      developerId: dlc.developerId,
      name       : dlc.name,
      price      : dlc.price,
      releaseDate: dlc.releaseDate,
      type       : dlc.type,
      createdAt  : dlc.createdAt,
      updatedAt  : dlc.updatedAt,
    })));

    await queryInterface.bulkInsert('DLCs', mockDLCs.map(dlc => ({
      id        : dlc.id,
      baseGameId: dlc.baseGameId,
    })));
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('DLCs', null, {});
    await queryInterface.bulkDelete('Games', null, {});
  }
};
