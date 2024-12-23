import requestService from '@services/request.js';
import { encrypt } from '@services/authentication.js';
import developerType from '@types/entity/developer.js';
import developerInputType from '@types/input/developer.js';

const { updateUser, updateDeveloper } = requestService;

const updateDeveloperMutationResolver = async (_, { developer }, { user_id }) => {
    if (!user_id) return false;

    const [updatedUser, updatedDeveloper] = await Promise.all([
        updateUser(user_id, {
            ...developer,
            password: await encrypt(developer.password),
        }),
        updateDeveloper(user_id, {
            ...developer,
        })
    ]);

    return {
        ...updatedUser.dataValues,
        ...updatedDeveloper.dataValues,
    };
}

export default {
    type: developerType,
    args: {
        developer: { type: developerInputType },
    },
    resolve: updateDeveloperMutationResolver,
};

