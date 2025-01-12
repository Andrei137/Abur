'use strict';

import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
    class LibraryItem extends Model {}
    LibraryItem.init(
        {
            customerId  : DataTypes.INTEGER,
            gameId      : DataTypes.INTEGER,
            purchaseDate: DataTypes.DATE,
        },
        {
            sequelize,
            modelName: 'LibraryItem',
        }
    );
    return LibraryItem;
};
