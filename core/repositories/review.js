import { handleValidation } from '@services/validation.js';
import requestService from '@services/request.js';
const { findReviewByFields, findGameByField, createReview } = requestService;

const validator = async (validationData) => {
    const { rating, gameId, userId } = validationData;

    if (rating === null) {
        return 'Rating is not given';
    }
    if (rating < 0 || rating > 10) {
        return 'Rating not between 0 and 10';
    }

    if (
        (await findReviewByFields(['gameId', 'customerId'], [gameId, userId])) !==
    null
    )
        return 'Customer already left a review for this game';

    return null;
};

const validateReview = async (validationData) =>
    await handleValidation(validator, validationData);

export const validateAndCreateReview = async (review, game, userId) => {
    const gameId = (await findGameByField('name', game)).id;
    await validateReview({ rating: review.rating, gameId, userId });

    return await createReview({
        ...review,
        customerId: userId,
        gameId,
    });
};
