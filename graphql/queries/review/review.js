import reviewType from '@types/entity/review.js';
import requestService from '@services/request.js';
import { GraphQLInt, GraphQLNonNull } from 'graphql';

const { findReviewById } = requestService;

const reviewQueryResolver = async (_, { id }) => await findReviewById(id);
export default {
    type: reviewType,
    args: {
        id: { type: new GraphQLNonNull(GraphQLInt) },
    },
    resolve: reviewQueryResolver,
};
