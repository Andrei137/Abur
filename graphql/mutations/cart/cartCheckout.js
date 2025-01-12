import { GraphQLBoolean } from 'graphql';
import { validateAndCheckoutCart } from '@repositories/carts.js';

const cartCheckoutMutationResolver = async (_, __, { userId }) => {
    return await validateAndCheckoutCart(userId);
};

export default {
    type: GraphQLBoolean,
    resolve: cartCheckoutMutationResolver,
};