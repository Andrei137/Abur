import { GraphQLInt } from 'graphql';
import gameType from '@types/entity/game.js';
import gameInputType from '@types/input/game.js';
import requestService from '@services/request.js';
import { validateGame } from '@repositories/games.js';

const { updateGame } = requestService;

const updateGameMutationResolver = async (_, { id, game }, { userId }) => {
    await validateGame({
        id,
        userId,
        name: game.name,
    });
    return await updateGame(id, game);
};

export default {
    type: gameType,
    args: {
        id  : { type: GraphQLInt },
        game: { type: gameInputType },
    },
    resolve: updateGameMutationResolver,
};
