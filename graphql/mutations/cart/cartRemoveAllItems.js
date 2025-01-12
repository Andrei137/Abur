import cartType from '@types/entity/cart.js';
import { deleteCartItems } from '@repositories/cart.js';

const cartRemoveAllItemsMutationResolver = async (_, {}, { userId }) => {
    await deleteCartItems(userId);
    return { userId };
}

export default {
    type: cartType,
    args: {},
    resolve: cartRemoveAllItemsMutationResolver,
};
