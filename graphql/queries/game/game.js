import gameType from '@types/entity/game.js';
import requestService from '@services/request.js';
import { GraphQLInt, GraphQLNonNull } from 'graphql';

const { findGameById } = requestService;

const gameQueryResolver = async (_, { id }) => await findGameById(id);

export default {
    type: gameType,
    args: {
        id: { type: new GraphQLNonNull(GraphQLInt) }
    },
    resolve: gameQueryResolver,
};
