import {
    GraphQLInt,
    GraphQLList,
    GraphQLFloat,
    GraphQLString,
    GraphQLNonNull,
    GraphQLObjectType,
} from 'graphql';
import GraphQLDate from 'graphql-date';
import { findDLCsInLibraryByCustomerId } from '@repositories/dlcs.js';
import dlcType from './dlc.js';
import reviewType from './review.js';
import developerType from './developer.js';
import requestService from '@services/request.js';

const {
    findDLCsByField,
    findDeveloperById,
    findReviewsByField,
} = requestService;

export default new GraphQLObjectType({
    name: 'Game',
    fields: () => ({
        id          : { type: new GraphQLNonNull(GraphQLInt) },
        name        : { type: new GraphQLNonNull(GraphQLString) },
        initialPrice: {
            type: new GraphQLNonNull(GraphQLFloat),
            resolve: game => game.price,
        },
        price       : { 
            type: new GraphQLNonNull(GraphQLFloat),
            resolve: game => game.price - (game.price * (game.percentage / 100)),
        },
        discount    : {
            type: new GraphQLNonNull(GraphQLString),
            resolve: game => `${game.percentage}%`,
        },
        releaseDate : { type: GraphQLDate },
        developer   : {
            type: developerType,
            resolve: async game =>
                await findDeveloperById(game.developerId, {
                    joinWith: 'User',
                }),
        },
        dlcs        : {
            type: new GraphQLList(dlcType),
            resolve: async game => game.userId === undefined
                    ? await findDLCsByField('baseGameId', game.id, {
                        joinWith: 'Game',
                    })
                    : (await findDLCsInLibraryByCustomerId(game.userId)).filter(
                        dlc => dlc.baseGameId === game.id
                    )
        },
        reviews     : {
            type: new GraphQLList(reviewType),
            resolve: async game => await findReviewsByField('gameId', game.id),
        },
    }),
});
