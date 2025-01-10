'use strict';
import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
    class LibraryItem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
        static associate(models) {
            // define association here
        }
    }
    LibraryItem.init(
        {
            customerId: DataTypes.INTEGER,
            gameId: DataTypes.INTEGER,
            purchaseDate: DataTypes.DATE,
        },
        {
            sequelize,
            modelName: 'LibraryItem',
        }
    );
    return LibraryItem;
};
