import requestService from '@services/request.js';
import { validateGame } from '@repositories/games.js';
import {
    GraphQLInt,
    GraphQLBoolean
} from 'graphql';

const {
    deleteGame,
    deleteDLCsByField,
} = requestService;

const deleteGameMutationResolver = async (_, { id }, { userId }) => {
    await validateGame({
        id,
        userId,
    });
    await deleteDLCsByField('baseGameId', id);
    return await deleteGame(id);
};

export default {
    type: GraphQLBoolean,
    args: {
        id: { type: GraphQLInt },
    },
    resolve: deleteGameMutationResolver,
};
