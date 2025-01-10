import { validateAndDeleteReview } from '@repositories/review.js';
import { GraphQLInt, GraphQLBoolean } from 'graphql';

const deleteReviewMutationResolver = async (_, { id }, { userId }) => {
    return await validateAndDeleteReview(id, userId);
};

export default {
    type: GraphQLBoolean,
    args: {
        id: { type: GraphQLInt },
    },
    resolve: deleteReviewMutationResolver,
};
