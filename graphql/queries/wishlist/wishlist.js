import { GraphQLString } from 'graphql';
import wishlistType from '@types/entity/wishlist.js';

const wishlistQueryResolver = async (_, { sortOption = 'default', order = 'ascending' }, { userId }) =>
    ({ sortOption, order, userId });

export default {
    type: wishlistType,
    args: {
        sortOption: { type: GraphQLString },
        order     : { type: GraphQLString },
    },
    resolve: wishlistQueryResolver,
};
