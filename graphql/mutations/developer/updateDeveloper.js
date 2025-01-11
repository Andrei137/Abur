import developerType from '@types/entity/developer.js';
import developerInputType from '@types/input/developer.js';
import { validateAndUpdateDeveloper } from '@repositories/developer.js';

const updateDeveloperMutationResolver = async (_, { developer }, { userId }) => {
    return await validateAndUpdateDeveloper({ userId, developer });
}

export default {
    type: developerType,
    args: {
        developer: { type: developerInputType },
    },
    resolve: updateDeveloperMutationResolver,
};
