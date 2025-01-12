import cartType from '@types/entity/cart.js';
import { validateAndDeleteCartItems } from '@repositories/cart.js';

const cartRemoveAllItemsMutationResolver = async (_, {}, { userId }) => {
    await validateAndDeleteCartItems({ userId });
    return { userId };
}

export default {
    type: cartType,
    resolve: cartRemoveAllItemsMutationResolver,
};
