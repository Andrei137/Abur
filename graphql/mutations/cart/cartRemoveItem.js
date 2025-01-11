import {
    GraphQLInt
} from 'graphql';
import cartType from '@types/entity/cart.js';
import { validateAndDeleteCartItem } from '@repositories/cart.js';

const cartRemoveItemMutationResolver = async (_, { gameId }, { userId }) => {
    await validateAndDeleteCartItem({ gameId, customerId: userId });
    return { userId };
}

export default {
    type: cartType,
    args: {
        gameId: { type: GraphQLInt },
    },
    resolve: cartRemoveItemMutationResolver,
};
