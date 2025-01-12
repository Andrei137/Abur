import wishlistType from '@types/entity/wishlist.js';
import { validateAndMoveAllItemsToCart } from '@repositories/wishlists.js';

const wishlistMoveAllItemsToCartMutationResolver = async (_, __, { userId }) => {
    await validateAndMoveAllItemsToCart(userId);
    return { userId };
};

export default {
    type: wishlistType,
    resolve: wishlistMoveAllItemsToCartMutationResolver,
};
