import wishlistType from '@types/entity/wishlist.js';

const wishlistQueryResolver = async (_, __, { userId }) => ({ userId });

export default {
    type: wishlistType,
    resolve: wishlistQueryResolver,
};
