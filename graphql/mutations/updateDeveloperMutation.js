import developerType from '../types/developerType.js';
import developerInputType from '../types/developerInputType.js';
import { encrypt } from '../../core/services/authenticationService.js';
import requestService from '../../core/services/requestService.js';

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
