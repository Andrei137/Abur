import { GraphQLString } from 'graphql';
import reviewType from '@types/entity/review.js';
import reviewInputType from '@types/input/review.js';
import { validateAndCreateReview } from '@repositories/reviews.js';

const createReviewMutationResolver = async (_, { review, game }, { userId }) =>
    await validateAndCreateReview({ review, game, userId });

export default {
    type: reviewType,
    args: {
        review: { type: reviewInputType },
        game: { type: GraphQLString },
    },
    resolve: createReviewMutationResolver,
};
