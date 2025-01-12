'use strict';

import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
    class Review extends Model {
        static associate(models) {
            Review.belongsTo(models.Game, {
                foreignKey: 'gameId',
            });
            Review.belongsTo(models.Customer, {
                foreignKey: 'customerId',
            });
        }
    }
    Review.init(
        {
            customerId: DataTypes.INTEGER,
            gameId    : DataTypes.INTEGER,
            rating    : DataTypes.INTEGER,
            comment   : DataTypes.STRING,
        },
        {
            sequelize,
            modelName: 'Review',
        }
    );
    return Review;
};
