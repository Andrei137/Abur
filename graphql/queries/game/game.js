import gameType from '@types/entity/game.js';
import requestService from '@services/request.js';
import { validateGame } from '@repositories/games.js';
import {
    GraphQLInt,
    GraphQLNonNull
} from 'graphql';

const { findGameById } = requestService;

const gameQueryResolver = async (_, { id }) => {
    await validateGame({ id });
    return await findGameById(id);
}

export default {
    type: gameType,
    args: {
        id: { type: new GraphQLNonNull(GraphQLInt) }
    },
    resolve: gameQueryResolver,
};
