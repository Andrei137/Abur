'use strict';

import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
    class CartItem extends Model {}
    CartItem.init(
        {
            gameId    : DataTypes.INTEGER,
            customerId: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: 'CartItem',
        }
    );
    return CartItem;
};
