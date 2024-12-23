import { GraphQLInt } from 'graphql';
import gameType from '@types/entity/game.js';
import gameInputType from '@types/input/game.js';
import requestService from '@services/request.js';

const { updateGame } = requestService;

const updateGameMutationResolver = async (_, { id, game }, { user_id }) => {
    if (!user_id) return false;

    return (await updateGame(id, game)).dataValues;
}

export default {
    type: gameType,
    args: {
        id  : { type: GraphQLInt },
        game: { type: gameInputType },
    },
    resolve: updateGameMutationResolver,
};

