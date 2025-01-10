import gameType from './game.js';
import dlcType from './dlc.js';
import customerType from './customer.js';
import {
    GraphQLInt,
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLString,
    GraphQLUnionType,
} from 'graphql';
import requestService from '@services/request.js';

const { findDLCById, findGameById, findCustomerById } = requestService;

const gameOrDlcType = new GraphQLUnionType({
    name: 'GameOrDlc',
    types: () => ([gameType, dlcType]),
    resolveType: value => (value.type === 'dlc' ? 'DLC' : 'Game'),
});

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
            type: gameOrDlcType,
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
