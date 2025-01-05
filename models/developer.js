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
        foreignKey: 'id'
      });
      Developer.hasMany(models.Game);
    }
  }
  Developer.init({
    studio: {
      type: DataTypes.STRING,
      unique: true
    },
    website: { 
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'Developer',
    timestamps: false,
  });
  return Developer;
};