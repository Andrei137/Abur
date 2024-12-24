import gameType from './game.js';
import developerType from './developer.js';
import requestService from '@services/request.js';
import {
    GraphQLInt,
    GraphQLFloat,
    GraphQLString,
    GraphQLNonNull,
    GraphQLObjectType,
} from 'graphql';
import GraphQLDate from 'graphql-date';

const { findDeveloperById, findGameById } = requestService;

export default new GraphQLObjectType({
    name: 'DLC',
    fields: () => ({
        id         : { type: new GraphQLNonNull(GraphQLInt) },
        name       : { type: new GraphQLNonNull(GraphQLString) },
        price      : { type: new GraphQLNonNull(GraphQLFloat) },
        releaseDate: { type: GraphQLDate },

        developer: {
            type   : developerType,
            resolve: async dlc =>
                await findDeveloperById(dlc.developerId, {
                    joinWith: 'User'
                }),
        },
        baseGame: {
            type: gameType,
            resolve: async dlc =>
                await findGameById(dlc.baseGameId),
        }
    }),
});
