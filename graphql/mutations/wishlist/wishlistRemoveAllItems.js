import wishlistType from '@types/entity/wishlist.js';
import { deleteWishlistItems } from '@repositories/wishlists.js';

const wishlistRemoveAllItemsMutationResolver = async (_, __, { userId }) => {
    await deleteWishlistItems({ userId });
    return { userId };
};

export default {
    type: wishlistType,
    resolve: wishlistRemoveAllItemsMutationResolver,
};
