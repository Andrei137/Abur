import gameType from '@types/entity/game.js';
import gameInputType from '@types/input/game.js';
import { validateAndCreateGame } from '@repositories/games.js';

const createGameMutationResolver = async (_, { game }, { userId }) =>
    await validateAndCreateGame({ game, userId });

export default {
    type: gameType,
    args: {
        game: { type: gameInputType },
    },
    resolve: createGameMutationResolver,
};
