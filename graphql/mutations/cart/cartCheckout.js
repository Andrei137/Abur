import {
    GraphQLBoolean
} from 'graphql';
import { validateAndCheckoutCart } from '@repositories/cart.js';

const cartCheckoutMutationResolver = async (_, {}, { userId }) => {
    await validateAndCheckoutCart(userId);
}

export default {
    type: GraphQLBoolean,
    args: {},
    resolve: cartCheckoutMutationResolver,
};
