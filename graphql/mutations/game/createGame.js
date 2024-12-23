import gameType from '@types/entity/game.js';
import gameInputType from '@types/input/game.js';
import requestService from '@services/request.js';
import { GraphQLString } from 'graphql';

const { createGame, findUserByField } = requestService;

const createGameMutationResolver = async (_, { game, developer }, { user_id }) => {
    if (!user_id) return false;

    return await createGame({
        ...game,
        developerId: (await findUserByField('username', developer)).id,
        type: 'game',
    });
}

export default {
    type: gameType,
    args: {
        game     : { type: gameInputType },
        developer: { type: GraphQLString },
    },
    resolve: createGameMutationResolver,
};
