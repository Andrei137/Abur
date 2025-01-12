import cartType from '@types/entity/cart.js';
import { deleteCartItems } from '@repositories/cart.js';

const cartRemoveAllItemsMutationResolver = async (_, __, { userId }) => {
    await deleteCartItems({ userId });
    return { userId };
};

export default {
    type: cartType,
    resolve: cartRemoveAllItemsMutationResolver,
};
