import { GraphQLInt } from 'graphql';
import reviewType from '@types/entity/review.js';
import reviewInputType from '@types/input/review.js';
import { validateAndUpdateReview } from '@repositories/review.js';

const updateReviewMutationResolver = async (_, { id, review }, { userId }) => {
    return await validateAndUpdateReview(id, userId, review);
};

export default {
    type: reviewType,
    args: {
        id: { type: GraphQLInt },
        review: { type: reviewInputType },
    },
    resolve: updateReviewMutationResolver,
};
