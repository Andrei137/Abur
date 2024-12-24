import { GraphQLString } from 'graphql';
import gameType from '@types/entity/game.js';
import gameInputType from '@types/input/game.js';
import requestService from '@services/request.js';
import { validGameName } from '@repositories/games.js';

const { createGame, findUserByField, findGameByField } = requestService;

const createGameMutationResolver = async (_, { game, developer }, { userId }) =>
    userId && await validGameName(game.name)
        ? await createGame({
            ...game,
            developerId: (await findUserByField('username', developer)).id,
            type: 'game',
        })
        : new Error('Name already taken')

export default {
    type: gameType,
    args: {
        game     : { type: gameInputType },
        developer: { type: GraphQLString },
    },
    resolve: createGameMutationResolver,
};
