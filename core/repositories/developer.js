import requestService from '@services/request.js';
import { handleValidation } from '@services/validation.js';
import { validateAndCreateUser } from '@repositories/user.js';

const { createDeveloper, findDeveloperByField } = requestService;

const validator = async validationData => {
    const { studio = null } = validationData;

    if (studio !== null) {
        const developer = await findDeveloperByField('studio', studio);
        if (developer) return 'studio already exists';
    }

    return null;
};

const validateDeveloper = async validationData => await handleValidation(validator, validationData);

export const validateAndCreateDeveloper = async (developer) => {
    await validateDeveloper(developer);

    const createdUser = await validateAndCreateUser(developer);

    const createdDeveloper = await createDeveloper({
        ...developer,
        id: createdUser.id
    });

    return {
        ...createdUser,
        ...createdDeveloper,
    };
}
