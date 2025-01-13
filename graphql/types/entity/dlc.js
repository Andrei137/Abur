import {
    GraphQLInt,
    GraphQLString,
    GraphQLNonNull,
    GraphQLObjectType,
} from 'graphql';
import gameType from './game.js';
import requestService from '@services/request.js';
import { commonGameFields } from '@services/utils.js';

const { findGameById } = requestService;

export default new GraphQLObjectType({
    name  : 'DLC',
    fields: () => ({
        id  : { type: new GraphQLNonNull(GraphQLInt) },
        name: { type: new GraphQLNonNull(GraphQLString) },
        baseGame: {
            type   : gameType,
            resolve: async ({ baseGameId }) => await findGameById(baseGameId),
        },
        ...commonGameFields(),
    }),
});
