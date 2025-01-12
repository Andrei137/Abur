'use strict';

import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
    class WishlistItem extends Model {}
    WishlistItem.init({
        customerId: DataTypes.INTEGER,
        gameId    : DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'WishlistItem',
    });
    return WishlistItem;
};
