import cartType from '@types/entity/cart.js';

const cartQueryResolver = async (_, __, { userId }) => ({ userId });

export default {
    type   : cartType,
    resolve: cartQueryResolver,
};
