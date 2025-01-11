import {
    GraphQLInt
} from 'graphql';
import cartType from '@types/entity/cart.js';
import { validateAndCreateCartItem } from '@repositories/cart.js';

const cartAddItemMutationResolver = async (_, { gameId }, { userId }) => {
    await validateAndCreateCartItem({ gameId, customerId: userId });
    return { userId };
}

export default {
    type: cartType,
    args: {
        gameId: { type: GraphQLInt },
    },
    resolve: cartAddItemMutationResolver,
};
