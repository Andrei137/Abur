import loginInputType from '../types/loginInputType.js';
import loginResultType from '../types/loginResultType.js';
import requestService from '../../core/services/requestService.js';
import { getToken } from '../../core/services/authenticationService.js';

const { findUserByField } = requestService;

const loginMutationResolver = async (_, { credentials }) => {
    const user = await findUserByField('username', credentials.username);

    return {
        token: getToken(user, credentials.password)
    };
}

const loginMutation = {
    type: loginResultType,
    args: {
        credentials: { type: loginInputType },
    },
    resolve: loginMutationResolver,
};

export default loginMutation;
