import {
    GraphQLInt,
    GraphQLBoolean
} from 'graphql';
import { validateAndDeleteGame } from '@repositories/games.js';

const deleteGameMutationResolver = async (_, { id }, { userId }) =>
    await validateAndDeleteGame({ id, userId });

export default {
    type: GraphQLBoolean,
    args: {
        id: { type: GraphQLInt },
    },
    resolve: deleteGameMutationResolver,
};
