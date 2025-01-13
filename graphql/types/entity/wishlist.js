import {
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull,
    GraphQLObjectType,
} from 'graphql';
import customerType from './customer.js';
import unionGameDLCType from './unionGameDLC.js';
import requestService from '@services/request.js';
import { sortGames } from '@services/sorter.js';
import { getWishlistItems } from '@repositories/wishlists.js';

const { findCustomerById } = requestService;

export default new GraphQLObjectType({
    name  : 'Wishlist',
    fields: () => ({
        customer: {
            type   : customerType,
            resolve: async ({ userId }) =>
                await findCustomerById(userId, {
                    joinWith: 'User',
                }),
        },
        items: {
            type   : new GraphQLList(unionGameDLCType),
            resolve: async ({ userId, sortOption, order }) => await sortGames(
                await getWishlistItems(userId),
                sortOption,
                order
            ),
        },
        totalItems: {
            type   : new GraphQLNonNull(GraphQLInt),
            resolve: async ({ userId }) => (await getWishlistItems(userId)).length,
        },
    }),
});
