import {
    GraphQLInt,
    GraphQLBoolean
} from 'graphql';
import { validateAndDeleteReview } from '@repositories/reviews.js';

const deleteReviewMutationResolver = async (_, { id }, { userId }) =>
    await validateAndDeleteReview({ id, userId });

export default {
    type: GraphQLBoolean,
    args: {
        id: { type: GraphQLInt },
    },
    resolve: deleteReviewMutationResolver,
};
