import {
    GraphQLInt,
    GraphQLBoolean
} from 'graphql';
import { validateAndDeleteDLC } from '@repositories/dlcs.js';

const deleteDLCMutationResolver = async (_, { id }, { userId }) =>
    await validateAndDeleteDLC({ id, userId });

export default {
    type: GraphQLBoolean,
    args: {
        id: { type: GraphQLInt },
    },
    resolve: deleteDLCMutationResolver,
};
