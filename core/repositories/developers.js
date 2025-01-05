import requestService from '@services/request.js';
import { handleValidation } from '@services/validation.js';

const { findUserByField, findDeveloperByField } = requestService;

const validator = async validationData => {
    const { username = null, email = null, studio = null } = validationData;

    if (username !== null) {
        const user = await findUserByField('username', username);
        if (user) return 'username already exists';
    }

    if (email !== null) {
        const user = await findUserByField('email', email);
        if (user) return 'email already exists';
    }

    if (studio !== null) {
        const user = await findDeveloperByField('studio', studio);
        if (user) return 'studio already exists';
    }

    return null;
};

export const validateDeveloper = async validationData => await handleValidation(validator, validationData);
