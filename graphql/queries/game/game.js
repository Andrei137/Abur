import gameType from '@types/entity/game.js';
import { validateAndReadGame } from '@repositories/games.js';
import {
    GraphQLInt,
    GraphQLNonNull
} from 'graphql';

const gameQueryResolver = async (_, { id }) =>
    await validateAndReadGame({ id });

export default {
    type: gameType,
    args: {
        id: { type: new GraphQLNonNull(GraphQLInt) }
    },
    resolve: gameQueryResolver,
};
