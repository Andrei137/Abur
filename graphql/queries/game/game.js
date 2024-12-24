import gameType from '@types/entity/game.js';
import { findValidGame } from '@repositories/games.js';
import {
    GraphQLInt,
    GraphQLNonNull
} from 'graphql';

const gameQueryResolver = async (_, { id }) =>
    await findValidGame(id) ?? new Error('Game not found');

export default {
    type: gameType,
    args: {
        id: { type: new GraphQLNonNull(GraphQLInt) }
    },
    resolve: gameQueryResolver,
};
