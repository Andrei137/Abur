import { GraphQLInt } from 'graphql';
import gameType from '@types/entity/game.js';
import gameInputType from '@types/input/game.js';
import requestService from '@services/request.js';
import { findValidGame } from '@repositories/games.js';

const { updateGame } = requestService;

const updateGameMutationResolver = async (_, { id, game }, { userId }) =>
    userId && await findValidGame(id)
        ? (await updateGame(id, game))
        : new Error('Game not found');

export default {
    type: gameType,
    args: {
        id  : { type: GraphQLInt },
        game: { type: gameInputType },
    },
    resolve: updateGameMutationResolver,
};
