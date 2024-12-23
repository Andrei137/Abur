import requestService from '@services/request.js';
import loginInputType from '@types/login/input.js';
import loginResultType from '@types/login/result.js';
import { getToken } from '@services/authentication.js';

const { findUserByField } = requestService;

const loginMutationResolver = async (_, { credentials }) => getToken(
    await findUserByField('username', credentials.username),
    credentials.password,
);

export default {
    type: loginResultType,
    args: {
        credentials: { type: loginInputType },
    },
    resolve: loginMutationResolver,
};

