import {
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull,
    GraphQLObjectType,
} from 'graphql';
import gameType from './game.js';
import customerType from './customer.js';

export default new GraphQLObjectType({
    name: 'WishList',
    fields: () => ({
        customer: { type: new GraphQLNonNull(customerType) },
        games   : { type: new GraphQLList(gameType) },
    }),
});
