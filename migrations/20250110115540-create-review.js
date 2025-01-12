"use strict";

const { Model } = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Reviews", {
      id: {
        type         : Sequelize.INTEGER,
        allowNull    : false,
        autoIncrement: true,
        primaryKey   : true,
      },
      customerId: {
        type      : Sequelize.INTEGER,
        allowNull : false,
        onDelete: "CASCADE",
        references: {
          key  : "id",
          model: {
            tableName: "Customers",
          },
        },
      },
      gameId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onDelete: "CASCADE",
        references: {
          key  : "id",
          model: {
            tableName: "Games",
          },
        },
      },
      rating: {
        type     : Sequelize.INTEGER,
        allowNull: false,
      },
      comment: {
        type: Sequelize.STRING,
      },
      createdAt: {
        type     : Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type     : Sequelize.DATE,
        allowNull: false,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Reviews");
  },
};
