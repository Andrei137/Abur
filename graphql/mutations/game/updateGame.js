import { GraphQLInt } from 'graphql';
import gameType from '@types/entity/game.js';
import gameInputType from '@types/input/game.js';
import { validateAndUpdateGame } from '@repositories/games.js';

const updateGameMutationResolver = async (_, { id, game }, { userId }) =>
    await validateAndUpdateGame({ id, userId, game });

export default {
    type: gameType,
    args: {
        id  : { type: GraphQLInt },
        game: { type: gameInputType },
    },
    resolve: updateGameMutationResolver,
};
