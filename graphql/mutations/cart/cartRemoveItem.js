import {
    GraphQLInt,
    GraphQLBoolean
} from 'graphql';
import { validateAndDeleteCartItem } from '@repositories/cart.js';

const cartRemoveItemMutationResolver = async (_, { gameId }, { userId }) => {
    return await validateAndDeleteCartItem({ gameId, customerId: userId });
}

export default {
    type: GraphQLBoolean,
    args: {
        gameId: { type: GraphQLInt },
    },
    resolve: cartRemoveItemMutationResolver,
};
