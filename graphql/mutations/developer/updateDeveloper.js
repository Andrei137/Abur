import requestService from '@services/request.js';
import { encrypt } from '@services/authentication.js';
import developerType from '@types/entity/developer.js';
import developerInputType from '@types/input/developer.js';

const { updateUser, updateDeveloper } = requestService;

const updateDeveloperMutationResolver = async (_, { developer }, { userId }) => {
    if (!userId) return false;

    const [updatedUser, updatedDeveloper] = await Promise.all([
        updateUser(userId, {
            ...developer,
            password: await encrypt(developer.password),
        }),
        updateDeveloper(userId, developer)
    ]);

    return {
        ...updatedUser,
        ...updatedDeveloper,
    };
}

export default {
    type: developerType,
    args: {
        developer: { type: developerInputType },
    },
    resolve: updateDeveloperMutationResolver,
};

