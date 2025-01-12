import {
    GraphQLInt,
    GraphQLList,
    GraphQLFloat,
    GraphQLNonNull,
    GraphQLObjectType,
} from 'graphql';
import customerType from './customer.js';
import unionGameDLCType from './unionGameDLC.js';
import requestService from '@services/request.js';
import { getCartTotalPrice, getCartItems } from '@repositories/carts.js';

const { findCustomerById } = requestService;

export default new GraphQLObjectType({
    name: 'Cart',
    fields: () => ({
        customer    : {
            type: customerType,
            resolve: async ({ userId }) =>
                await findCustomerById(userId, {
                    joinWith: 'User',
                }),
        },
        items       : {
            type: new GraphQLList(unionGameDLCType),
            resolve: async ({ userId }) => await getCartItems(userId),
        },
        totalItems  : {
            type: new GraphQLNonNull(GraphQLInt),
            resolve: async ({ userId }) => (await getCartItems(userId)).length,
        },
        totalPrice  : {
            type: new GraphQLNonNull(GraphQLFloat),
            resolve: async ({ userId }) => await getCartTotalPrice(userId),
        },
    }),
});
