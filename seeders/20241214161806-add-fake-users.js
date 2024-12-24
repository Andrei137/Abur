'use strict';

const { faker } = require('@faker-js/faker');
const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const mockDevelopers = [
      {
        id: 0,
        username : 'PlayStationStudios',
        password : await bcrypt.hash('PlayStationStudios1234', 5),
        email    : 'contact@sony.com',
        createdAt: Date(),
        updatedAt: Date(),

        studio   : 'PlayStation Studios',
        website  : 'https://www.playstation.com/playstation-studios/',
      },
      {
        id: 1,
        username : 'CD_PROJEKT_RED',
        password : await bcrypt.hash('CD_PROJEKT_RED1234', 5),
        email    : 'contact@cdpr.com',
        createdAt: Date(),
        updatedAt: Date(),

        studio   : 'CD PROJEKT RED',
        website  : 'https://www.cdprojektred.com/en',
      },
      {
        id: 2,
        username : 'SquareEnix',
        password : await bcrypt.hash('SquareEnix1234', 5),
        email    : 'contact@square.com',
        createdAt: Date(),
        updatedAt: Date(),

        studio   : 'Square Enix',
        website  : 'https://www.square-enix.com/',
      }
    ];

    const mockCustomers = [
      {
        id: 3,
        username : 'FixBambucea',
        password : await bcrypt.hash('FixBambucea1234', 5),
        email    : 'FixBambucea@gmail.com',
        createdAt: Date(),
        updatedAt: Date(),

        firstName: 'Bambucea',
        lastName : 'Fix',
      },
      {
        id: 4,
        username : 'FixBambucea-2',
        password : await bcrypt.hash('FixBambucea1234', 5),
        email    : 'FixBambucea-2@gmail.com',
        createdAt: Date(),
        updatedAt: Date(),

        firstName: 'Bambucea-2',
        lastName : 'Fix',
      }
    ];

    // TODO: fake data
    // let userId = mockDevelopers.length;
    // const mockCustomers = new Array(10).fill().map(() =>  {
    //   return {
    //     id: userId++,
    //     username: faker.internet.username(),
    //     password: faker.internet.password(),
    //     email: faker.internet.email(),
    //     createdAt: Date(),
    //     updatedAt: Date(),

    //     firstName: faker.person.firstName(),
    //     lastName: faker.person.lastName()
    //   }
    // });

    await queryInterface.bulkInsert('Users', mockDevelopers.map(developer => ({
      id       : developer.id,
      username : developer.username,
      password : developer.password,
      email    : developer.email,
      createdAt: developer.createdAt,
      updatedAt: developer.updatedAt,
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
      createdAt: customer.createdAt,
      updatedAt: customer.updatedAt,
    })));

    await queryInterface.bulkInsert('Customers', mockCustomers.map(customer => ({
      id       : customer.id,
      firstName: customer.firstName,
      lastName : customer.lastName,
    })));

    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
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
