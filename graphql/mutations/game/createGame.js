import { GraphQLString } from 'graphql';
import gameType from '@types/entity/game.js';
import gameInputType from '@types/input/game.js';
import requestService from '@services/request.js';
import { validateGame } from '@repositories/games.js';

const { createGame, findUserByField } = requestService;

const createGameMutationResolver = async (_, { game, developer }) => {
    await validateGame({ name: game.name });
    return await createGame({
        ...game,
        developerId: (await findUserByField('username', developer)).id,
        type: 'game',
    });
};

export default {
    type: gameType,
    args: {
        game     : { type: gameInputType },
        developer: { type: GraphQLString },
    },
    resolve: createGameMutationResolver,
};
