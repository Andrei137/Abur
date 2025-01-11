import {
    GraphQLBoolean
} from 'graphql';
import { deleteCartItems } from '@repositories/cart.js';

const cartRemoveAllItemsMutationResolver = async (_, {}, { userId }) => {
    return await deleteCartItems(userId);
}

export default {
    type: GraphQLBoolean,
    args: {
    },
    resolve: cartRemoveAllItemsMutationResolver,
};
