'use strict';

import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class Game extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Game.belongsTo(models.Developer, {
        foreignKey: 'developerId',
      });
    }
  }
  Game.init({
    name: DataTypes.STRING,
    price: DataTypes.DOUBLE,
    releaseDate: DataTypes.DATE,
    developerId: DataTypes.INTEGER,
    type: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Game',
  });
  return Game;
};