'use strict';
import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
    class CartItem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
        static associate() {
            // define association here
        }
    }
    CartItem.init(
        {
            gameId: DataTypes.INTEGER,
            customerId: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: 'CartItem',
        }
    );
    return CartItem;
};
