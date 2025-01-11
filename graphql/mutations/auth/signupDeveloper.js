import developerType from '@types/entity/developer.js';
import developerInputType from '@types/input/developer.js';
import { validateAndCreateDeveloper } from '@repositories/developer.js';

const signupDeveloperMutationResolver = async (_, { developer }) =>
    await validateAndCreateDeveloper({ developer });

export default {
    type: developerType,
    args: {
        developer: { type: developerInputType },
    },
    resolve: signupDeveloperMutationResolver,
};
