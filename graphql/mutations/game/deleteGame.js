import requestService from '@services/request.js';
import { findValidGame } from '@repositories/games.js';
import {
    GraphQLInt,
    GraphQLBoolean
} from 'graphql';

const { deleteGame } = requestService;

const createGameMutationResolver = async (_, { id }, { userId }) =>
    userId && await findValidGame(id)
        ? await deleteGame(id)
        : false;


export default {
    type: GraphQLBoolean,
    args: {
        id: { type: GraphQLInt },
    },
    resolve: createGameMutationResolver,
};
