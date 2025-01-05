import requestService from '@services/request.js';
import { encrypt } from '@services/authentication.js';
import developerType from '@types/entity/developer.js';
import developerInputType from '@types/input/developer.js';
import { validateDeveloper } from '@repositories/developers.js';

const { createUser, createDeveloper } = requestService;

const createDeveloperMutationResolver = async (_, { developer }) => {
    await validateDeveloper(developer);

    const createdUser = await createUser({
        ...developer,
        password: await encrypt(developer.password),
    });

    const createdDeveloper = await createDeveloper({
        ...developer,
        id: createdUser.id
    });

    return {
        ...createdUser,
        ...createdDeveloper,
    };
}

export default {
    type: developerType,
    args: {
        developer: { type: developerInputType },
    },
    resolve: createDeveloperMutationResolver,
};
