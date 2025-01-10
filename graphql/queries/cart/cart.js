import cartType from '@types/entity/cart.js';

const cartQueryResolver = async (_, {}, { userId }) => ({ userId });

export default {
    type: cartType,
    args: {},
    resolve: cartQueryResolver,
};
