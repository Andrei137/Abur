import config from './config.js';

const info = (...params) => {
    if (config.NODE_ENV !== 'test') {
        console.log(...params);
    }
};

const error = (...params) => {
    if (config.NODE_ENV !== 'test') {
        console.error(...params);
    }
};

export default {
    info,
    error
};
