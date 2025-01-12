import bcrypt from 'bcrypt';
import config from '../../config/config.js';
import jwt from 'jsonwebtoken';

const encrypt = async (password) =>
    await bcrypt.hash(password, config.SALT_ROUNDS);

const validPassword = async (providedPassword, actualPassword) =>
    await bcrypt.compare(providedPassword, actualPassword);

const getToken = async (user, actualPassword) => ({
    token: user && (await validPassword(actualPassword, user.password))
        ? jwt.sign({ userId: user.id }, config.SECRET)
        : null
});

const verifyToken = token => jwt.verify(token, config.SECRET);

export {
    encrypt,
    getToken,
    verifyToken
};
