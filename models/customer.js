'use strict';

import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
    class Customer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
        static associate(models) {
            Customer.belongsTo(models.User, {
                foreignKey: 'id',
            });
            Customer.hasMany(models.Review);
            Customer.belongsToMany(models.Game, {
                through: 'LibraryItem',
            });
        }
    }
    Customer.init(
        {
            firstName: DataTypes.STRING,
            lastName: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: 'Customer',
            timestamps: false,
        }
    );
    return Customer;
};
