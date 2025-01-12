'use strict';

import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
    class User extends Model {
        static associate(models) {
            User.hasOne(models.Developer, {
                foreignKey: 'id',
                allowNull : true,
            });
            User.hasOne(models.Customer, {
                foreignKey: 'id',
                allowNull : true,
            });
        }
    }
    User.init({
        username: {
            type  : DataTypes.STRING,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
        },
        email: {
            type  : DataTypes.STRING,
            unique: true,
        }
    }, {
        sequelize,
        modelName: 'User',
    });
    return User;
};
