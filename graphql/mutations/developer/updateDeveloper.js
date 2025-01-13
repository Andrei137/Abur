import developerType from '@types/entity/developer.js';
import developerInputType from '@types/input/developer.js';
import { validateAndUpdateDeveloper } from '@repositories/developers.js';

const updateDeveloperMutationResolver = async (_, { developer }, { userId }) =>
    await validateAndUpdateDeveloper({ userId, developer });

export default {
    type: developerType,
    args: {
        developer: { type: developerInputType },
    },
    resolve: updateDeveloperMutationResolver,
};
