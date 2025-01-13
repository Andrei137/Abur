import { GraphQLObjectType } from 'graphql';
import authMutations from '@auth-mutations';
import cartMutations from '@cart-mutations';
import customerMutations from '@customer-mutations';
import developerMutations from '@developer-mutations';
import dlcMutations from '@dlc-mutations';
import gameMutations from '@game-mutations';
import reviewMutations from '@review-mutations';
import wishlistMutations from '@wishlist-mutations';
import { authHandler } from './authHandler.js';

export default new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        ...authMutations,
        ...authHandler(cartMutations, 'customer'),
        ...authHandler(customerMutations, 'customer'),
        ...authHandler(developerMutations, 'developer'),
        ...authHandler(dlcMutations, 'developer'),
        ...authHandler(gameMutations, 'developer'),
        ...authHandler(reviewMutations, 'customer'),
        ...authHandler(wishlistMutations, 'customer'),
    },
});
