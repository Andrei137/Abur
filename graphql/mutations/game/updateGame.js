import { GraphQLInt } from 'graphql';
import gameType from '@types/entity/game.js';
import gameInputType from '@types/input/game.js';
import requestService from '@services/request.js';
import { encrypt } from '@services/authentication.js';

const { findGameById, updateGame } = requestService;

const updateGameMutationResolver = async (_, { id, game }, { user_id }) => {
    if (!user_id) return false;

    const updatedGame = await updateGame(id, {
        ...game,
    })

    return {
        ...updatedGame.dataValues,
    };
}

export default {
    type: gameType,
    args: {
        id: { type: GraphQLInt },
        game: { type: gameInputType },
    },
    resolve: updateGameMutationResolver,
};

