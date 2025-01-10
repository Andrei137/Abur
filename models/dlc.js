'use strict';

import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
    class DLC extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
        static associate(models) {
            /* Might need later
            DLC.belongsTo(models.Game, {
                foreignKey: 'baseGameId',
                as: 'baseGame',
            });
            */
            DLC.belongsTo(models.Game, {
                foreignKey: 'id',
            });
        }
    }
    DLC.init({
        baseGameId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    }, {
        sequelize,
        modelName: 'DLC',
        timestamps: false,
    });
    return DLC;
};
