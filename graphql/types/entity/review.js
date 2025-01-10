import gameType from './game.js';
import customerType from './customer.js';
import {
    GraphQLInt,
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLString,
} from 'graphql';
import requestService from '@services/request.js';

const { findGameById, findCustomerById } = requestService;

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

        // TODO: union between gameType and dlcType
        game: {
            type: gameType,
            resolve: async (review) => await findGameById(review.gameId),
        },
    }),
});
