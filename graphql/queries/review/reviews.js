import { GraphQLList } from 'graphql';
import requestService from '@services/request.js';
import reviewType from '@types/entity/review.js';

const { findAllReviews } = requestService;

const reviewsQueryResolver = async () => await findAllReviews();

export default {
    type: new GraphQLList(reviewType),
    resolve: reviewsQueryResolver,
};
