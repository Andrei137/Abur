import requestService from '@services/request.js';
import { GraphQLInt, GraphQLBoolean } from 'graphql';

const { deleteGame } = requestService;

const createGameMutationResolver = async (_, { id }, { user_id }) => {
    if (!user_id) return false;

    return await deleteGame(id);
}

export default {
    type: GraphQLBoolean,
    args: {
        id: { type: GraphQLInt },
    },
    resolve: createGameMutationResolver,
};
