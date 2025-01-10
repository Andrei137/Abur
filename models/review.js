'use strict';
import { Model } from 'sequelize';
export default (sequelize, DataTypes) => {
    class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
        static associate(models) {
            // define association here
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
            gameId: DataTypes.INTEGER,
            rating: DataTypes.INTEGER,
            comment: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: 'Review',
        }
    );
    return Review;
};
