import requestService from '@services/request.js';
import { handleValidation } from '@services/validation.js';
import { encrypt } from '@services/authentication.js';

const {
    createUser,
    updateUser,
    findUserByField,
} = requestService;

const validator = async validationData => {
    const {
        id = null,
        username = null,
        password = null,
        email = null
    } = validationData;

    if (id !== null) {
        // Update
        if (username !== null && await findUserByField('username', username)) return 'username already exists';
        if (email !== null && await findUserByField('email', email)) return 'email already exists';
    }
    else {
        // Create
        if (username === null) return 'username cannot be null';
        if (password === null) return 'password cannot be null';
        if (email === null) return 'email cannot be null';

        if (await findUserByField('username', username)) return 'username already exists';
        if (await findUserByField('email', email)) return 'email already exists';
    }

    return null;
};

const validateUser = async validationData =>
    await handleValidation(validator, validationData);

export const validateAndCreateUser = async ({ user }) => {
    await validateUser(user);
    return await createUser({
        ...user,
        password: await encrypt(user.password),
    });
}

export const validateAndUpdateUser = async ({ userId, user }) => {
    await validateUser({ id: userId, user });
    return await updateUser(userId, {
        ...user,
        password: await encrypt(user.password),
    })
}
