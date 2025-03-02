'use strict';

import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
    class Game extends Model {
        static associate(models) {
            Game.belongsTo(models.Developer, {
                foreignKey: 'developerId',
            });
            // If foreignKey isn't used, it creates a default GameId
            // Because DLC has two foreign keys pointing to Game
            Game.hasMany(models.DLC, {
                foreignKey: 'baseGameId',
            });
            Game.hasMany(models.Review);
            Game.belongsToMany(models.Customer, {
                through: 'LibraryItem',
            });
            Game.belongsToMany(models.Customer, {
                through: 'CartItem',
            });
            Game.belongsToMany(models.Customer, {
                through: 'WishlistItem',
            });
        }
    }
    Game.init(
        {
            name: {
                type  : DataTypes.STRING,
                unique: true
            },
            price             : DataTypes.DOUBLE,
            discountPercentage: DataTypes.INTEGER,
            releaseDate       : DataTypes.DATE,
            developerId       : DataTypes.INTEGER,
            type              : DataTypes.STRING,
        },
        {
            sequelize,
            modelName: 'Game',
        }
    );
    return Game;
};
