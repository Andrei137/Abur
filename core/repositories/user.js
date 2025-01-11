import requestService from '@services/request.js';
import { encrypt } from '@services/authentication.js';
import { handleValidation } from '@services/validation.js';

const {
    createUser,
    updateUser,
    findUserByField,
} = requestService;

const validator = async validationData => {
    const {
        username = null,
        email = null
    } = validationData;

    if (username !== null) {
        const user = await findUserByField('username', username);
        if (user) return 'username already exists';
    }

    if (email !== null) {
        const user = await findUserByField('email', email);
        if (user) return 'email already exists';
    }

    return null;
};

const validateUser = async validationData =>
    await handleValidation(validator, validationData);

export const validateAndCreateUser = async user => {
    await validateUser(user);
    return await createUser({
        ...user,
        password: await encrypt(user.password),
    });
}

export const validateAndUpdateUser = async (userId, user) => {
    await validateUser(user);
    return await updateUser(userId, {
        ...user,
        password: await encrypt(user.password),
    })
}
