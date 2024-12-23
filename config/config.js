import 'dotenv/config';

const { PORT = '3000', SECRET, SALT_ROUNDS, NODE_ENV } = process.env;

const createConfig = environment => ({
    dialect: 'sqlite',
    storage: environment === 'test'
        ? 'db.test.sqlite'
        : 'db.sqlite',
});

export default {
    PORT,
    SECRET,
    NODE_ENV,
    SALT_ROUNDS: parseInt(SALT_ROUNDS),
    production : createConfig('production'),
    development: createConfig('development'),
    test       : createConfig('test'),
};
