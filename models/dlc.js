'use strict';

import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
    class DLC extends Model {
        static associate(models) {
            DLC.belongsTo(models.Game, {
                foreignKey: 'id',
            });
        }
    }
    DLC.init({
        baseGameId: {
            type     : DataTypes.INTEGER,
            allowNull: false,
        },
    }, {
        sequelize,
        modelName : 'DLC',
        timestamps: false,
    });
    return DLC;
};
