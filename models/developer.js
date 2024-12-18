'use strict';

import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class Developer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Developer.belongsTo(models.User, {
        foreignKey: 'id',
        targetKey: 'id'
      });
    }
  }
  Developer.init({
    studio: DataTypes.STRING,
    website: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Developer',
  });
  return Developer;
};