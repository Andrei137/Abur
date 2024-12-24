import requestService from '@services/request.js';
import { validateGame } from '@repositories/games.js';
import {
    GraphQLInt,
    GraphQLBoolean
} from 'graphql';

const {
    deleteDLC,
    deleteGame,
} = requestService;

const deleteDLCMutationResolver = async (_, { id }, { userId }) => {
    await validateGame({
        id,
        userId,
        type: 'dlc',
    });
    await deleteDLC(id);
    return await deleteGame(id);
};

export default {
    type: GraphQLBoolean,
    args: {
        id: { type: GraphQLInt },
    },
    resolve: deleteDLCMutationResolver,
};
