'use strict';
import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
    class WishlistItem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
        static associate() {
            // define association here
        }
    }
    WishlistItem.init({
        customerId: DataTypes.INTEGER,
        gameId: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'WishlistItem',
    });
    return WishlistItem;
};