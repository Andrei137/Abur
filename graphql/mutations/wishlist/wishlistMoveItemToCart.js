import { GraphQLInt } from 'graphql';
import wishlistType from '@types/entity/wishlist.js';
import { validateAndMoveItemToCart } from '@repositories/wishlists.js';

const wishlistMoveItemToCartMutationResolver = async (_, { gameId }, { userId }) => {
    await validateAndMoveItemToCart({ gameId, customerId: userId });
    return { userId };
};

export default {
    type: wishlistType,
    args: {
        gameId: { type: GraphQLInt },
    },
    resolve: wishlistMoveItemToCartMutationResolver,
};
