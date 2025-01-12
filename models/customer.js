'use strict';

import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
    class Customer extends Model {
        static associate(models) {
            Customer.belongsTo(models.User, {
                foreignKey: 'id',
            });
            Customer.hasMany(models.Review);
            Customer.belongsToMany(models.Game, {
                through: 'LibraryItem',
            });
            Customer.belongsToMany(models.Game, {
                through: 'CartItem',
            });
            Customer.belongsToMany(models.Game, {
                through: 'WishlistItem',
            });
        }
    }
    Customer.init(
        {
            firstName: DataTypes.STRING,
            lastName : DataTypes.STRING,
        },
        {
            sequelize,
            modelName : 'Customer',
            timestamps: false,
        }
    );
    return Customer;
};
