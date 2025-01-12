import { GraphQLInt } from 'graphql';
import wishlistType from '@types/entity/wishlist.js';
import { validateAndCreateWishlistItem } from '@repositories/wishlists.js';

const wishlistAddItemMutationResolver = async (_, { gameId }, { userId }) => {
    await validateAndCreateWishlistItem({ gameId, customerId: userId });
    return { userId };
};

export default {
    type: wishlistType,
    args: {
        gameId: { type: GraphQLInt },
    },
    resolve: wishlistAddItemMutationResolver,
};
