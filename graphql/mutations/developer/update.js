import requestService from '@services/request.js';
import { encrypt } from '@services/authentication.js';
import developerType from '@types/entity/developer.js';
import developerInputType from '@types/input/developer.js';

const { findUserById, findDeveloperById } = requestService;
const { updateUser, updateDeveloper } = requestService;

const updateDeveloperMutationResolver = async (_, input, context) => {
    if (!context.user_id) {
        return false;
    }

    const [user, developer] = await Promise.all([
        findUserById(context.user_id),
        findDeveloperById(context.user_id)
    ]);

    if (!user || !developer) {
        return false;
    }

    const [updatedUser, updatedDeveloper] = await Promise.all([
        updateUser(user, {
            ...input.developer,
            password: await encrypt(input.developer.password),
        }),
        updateDeveloper(developer, {
            ...input.developer,
        })
    ]);

    return {
        ...updatedUser.dataValues,
        ...updatedDeveloper.dataValues,
    };
}

const updateDeveloperMutation = {
    type: developerType,
    args: {
        developer: { type: developerInputType },
    },
    resolve: updateDeveloperMutationResolver,
};

export default updateDeveloperMutation;
