'use strict';

import fs from 'fs';
import path from 'path';
import config from '@config';
import process from 'process';
import Sequelize from 'sequelize';
import { pathToFileURL } from 'url';
import logger from '@core/logger.js';

const __dirname = import.meta.dirname;
const env = process.env.NODE_ENV || 'development';

let sequelize;
if (config.use_env_variable) {
    sequelize = new Sequelize(process.env[config.use_env_variable], config[env]);
}
else {
    sequelize = new Sequelize(config[env].database, config[env].username, config[env].password, config[env]);
}
sequelize.options.logging = (msg) => {
    logger.info(msg.replace('Executing (default): ', ''));
};

const models = await Promise.all(fs
    .readdirSync(__dirname)
    .filter(file => {
        return (
            file.indexOf('.') !== 0 &&
      file !== __dirname,
            file !== 'index.js' &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
        );
    })
    .map(async file => {
        const module = await import(pathToFileURL(path.join(__dirname, file)).href);
        return module.default(sequelize, Sequelize.DataTypes);
    })
);

const db = models.reduce((acc, model) => {
    acc[model.name] = model;
    return acc;
}, {});

Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
