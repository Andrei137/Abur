import requestService from '@services/request.js';
import { GraphQLInt, GraphQLBoolean } from 'graphql';

const { findGameById, deleteGame } = requestService;

const createGameMutationResolver = async (_, { id }, { userId }) =>
    userId && (await findGameById(id))?.type === 'game'
        ? await deleteGame(id)
        : false;


export default {
    type: GraphQLBoolean,
    args: {
        id: { type: GraphQLInt },
    },
    resolve: createGameMutationResolver,
};
