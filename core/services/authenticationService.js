import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../../utils/config.js';

const encrypt = async (password) =>
    await bcrypt.hash(password, config.SALT_ROUNDS);

const validPassword = async (providedPassword, actualPassword) =>
    await bcrypt.compare(providedPassword, actualPassword);

const getToken = async (user, actualPassword) =>
    user && (await validPassword(actualPassword, user.password))
        ? jwt.sign({ user_id: user.user_id }, config.SECRET)
        : null;

export {
    encrypt,
    getToken,
};
