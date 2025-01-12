'use strict';

import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
    class Developer extends Model {
        static associate(models) {
            Developer.belongsTo(models.User, {
                foreignKey: 'id'
            });
            Developer.hasMany(models.Game);
        }
    }
    Developer.init({
        studio: {
            type  : DataTypes.STRING,
            unique: true,
        },
        website: {
            type: DataTypes.STRING
        },
    }, {
        sequelize,
        modelName : 'Developer',
        timestamps: false,
    });
    return Developer;
};