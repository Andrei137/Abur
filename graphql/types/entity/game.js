import dlcType from './dlc.js';
import developerType from './developer.js';
import reviewType from './review.js';
import requestService from '@services/request.js';
import {
    GraphQLInt,
    GraphQLList,
    GraphQLFloat,
    GraphQLString,
    GraphQLNonNull,
    GraphQLObjectType,
} from 'graphql';
import GraphQLDate from 'graphql-date';

const { findDeveloperById, findDLCsByField, findReviewsByField } =
  requestService;

export default new GraphQLObjectType({
    name: 'Game',
    fields: () => ({
        id: { type: new GraphQLNonNull(GraphQLInt) },
        name: { type: new GraphQLNonNull(GraphQLString) },
        price: { type: new GraphQLNonNull(GraphQLFloat) },
        releaseDate: { type: GraphQLDate },

        developer: {
            type: developerType,
            resolve: async (game) =>
                await findDeveloperById(game.developerId, {
                    joinWith: 'User',
                }),
        },
        dlcs: {
            type: new GraphQLList(dlcType),
            resolve: async (game) =>
                await findDLCsByField('baseGameId', game.id, {
                    joinWith: 'Game',
                }),
        },
        reviews: {
            type: new GraphQLList(reviewType),
            resolve: async (game) => await findReviewsByField('gameId', game.id),
        },
    }),
});
