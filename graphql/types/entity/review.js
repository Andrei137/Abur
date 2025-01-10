import gameType from './game.js';
import unionGameDLC from './unionGameDLC.js'
import customerType from './customer.js';
import {
    GraphQLInt,
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLString,
} from 'graphql';
import requestService from '@services/request.js';

const { findDLCById, findGameById, findCustomerById } = requestService;

export default new GraphQLObjectType({
    name: 'Review',
    fields: () => ({
        id: { type: new GraphQLNonNull(GraphQLInt) },
        rating: { type: new GraphQLNonNull(GraphQLInt) },
        comment: { type: GraphQLString },

        customer: {
            type: customerType,
            resolve: async (review) => await findCustomerById(review.customerId),
        },

        game: {
            type: unionGameDLC,
            resolve: async (review) => {
                const dlc = await findDLCById(review.gameId, {
                    joinWith: 'Game'
                });
                if (dlc === null) {
                    return await findGameById(review.gameId);
                }
                return dlc;
            },
        },
    }),
});
