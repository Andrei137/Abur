import { GraphQLInt } from 'graphql';
import wishlistType from '@types/entity/wishlist.js';
import { validateAndDeleteWishlistItem } from '@repositories/wishlists.js';

const wishlistRemoveItemMutationResolver = async (_, { gameId }, { userId }) => {
    await validateAndDeleteWishlistItem({ gameId, customerId: userId });
    return { userId };
};

export default {
    type: wishlistType,
    args: {
        gameId: { type: GraphQLInt },
    },
    resolve: wishlistRemoveItemMutationResolver,
};
