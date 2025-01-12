'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const { encrypt } = await import('../core/services/authentication.js');
    const mockDevelopers = [
      {
        id       : 0,
        username : 'PlayStationStudios',
        password : await encrypt('PlayStationStudios1234'),
        email    : 'contact@sony.com',
        studio   : 'PlayStation Studios',
        website  : 'https://www.playstation.com/playstation-studios/',
      },
      {
        id       : 1,
        username : 'CD_PROJEKT_RED',
        password : await encrypt('CD_PROJEKT_RED1234'),
        email    : 'contact@cdpr.com',
        studio   : 'CD PROJEKT RED',
        website  : 'https://www.cdprojektred.com/en',
      },
      {
        id       : 2,
        username : 'SquareEnix',
        password : await encrypt('SquareEnix1234'),
        email    : 'contact@square.com',
        studio   : 'Square Enix',
        website  : 'https://www.square-enix.com/',
      },
      {
        id       : 3,
        username : 'Nintendo',
        password : await encrypt('Nintendo'),
        email    : 'contact@nintendo.com',
        studio   : 'Nintendo',
        website  : 'https://www.nintendo.com/us/',
      },
      {
        id       : 4,
        username : '18LightGame',
        password : await encrypt('18LightGame1234'),
        email    : 'contact@18light.com',
        studio   : '18Light Game',
        website  : 'https://www.18light.cc/en/',
      },
      {
        id       : 5,
        username : 'Capcom',
        password : await encrypt('Capcom1234'),
        email    : 'contact@capcom.com',
        studio   : 'Capcom',
        website  : 'https://www.capcom.com/',
      },
      {
        id       : 6,
        username : 'FromSoftware',
        password : await encrypt('FromSoftware1234'),
        email    : 'contact@fromsoft.com',
        studio   : 'FromSoftware Inc.',
        website  : 'https://www.fromsoftware.jp/ww/',
      },
      {
        id       : 7,
        username : 'KojimaProductions',
        password : await encrypt('KojimaProductions1234'),
        email    : 'contact@kojima.com',
        studio   : 'Kojima Productions',
        website  : 'https://www.kojimaproductions.jp/en',
      },
      {
        id       : 8,
        username : 'RockstarGames',
        password : await encrypt('RockstarGames1234'),
        email    : 'contact@rockstar.com',
        studio   : 'Rockstar Games',
        website  : 'https://www.fromsoftware.jp/ww/',
      },
      {
        id       : 9,
        username : 'FrictionalGames',
        password : await encrypt('FrictionalGames1234'),
        email    : 'contact@frictional.com',
        studio   : 'Frictional Games',
        website  : 'https://frictionalgames.com/',
      },
    ];

    const mockCustomers = [
      {
        id       : 10,
        username : 'FixBambucea',
        password : await encrypt('FixBambucea1234'),
        email    : 'fixbambucea@gmail.com',
        firstName: 'Bambucea',
        lastName : 'Fix',
      },
      {
        id       : 11,
        username : 'CodrinBradea',
        password : await encrypt('CodrinBradea1234'),
        email    : 'codrinbradea@gmail.com',
        firstName: 'Codrin',
        lastName : 'Bradea',
      },
      {
        id       : 12,
        username : 'NeculaeAndrei',
        password : await encrypt('NeculaeAndrei1234'),
        email    : 'neculaeandrei@gmail.com',
        firstName: 'Andrei',
        lastName : 'Neculae',
      },
      {
        id       : 13,
        username : 'MihalacheSebi',
        password : await encrypt('MihalacheSebi1234'),
        email    : 'sebimihalache@gmail.com',
        firstName: 'Sebi',
        lastName : 'Mihalache',
      },
      {
        id       : 14,
        username : 'VisanSebi',
        password : await encrypt('VisanSebi1234'),
        email    : 'visansebi@gmail.com',
        firstName: 'Sebi',
        lastName : 'Visan',
      },
    ];

    await queryInterface.bulkInsert('Users', mockDevelopers.map(developer => ({
      id       : developer.id,
      username : developer.username,
      password : developer.password,
      email    : developer.email,
      createdAt: Date(),
      updatedAt: Date(),
    })));

    await queryInterface.bulkInsert('Developers', mockDevelopers.map(developer => ({
      id     : developer.id,
      studio : developer.studio,
      website: developer.website,
    })));

    await queryInterface.bulkInsert('Users', mockCustomers.map(customer => ({
      id       : customer.id,
      username : customer.username,
      password : customer.password,
      email    : customer.email,
      createdAt: Date(),
      updatedAt: Date(),
    })));

    await queryInterface.bulkInsert('Customers', mockCustomers.map(customer => ({
      id       : customer.id,
      firstName: customer.firstName,
      lastName : customer.lastName,
    })));
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Developers', null, {});
    await queryInterface.bulkDelete('Customers', null, {});
    await queryInterface.bulkDelete('Users', null, {});
  },
};
