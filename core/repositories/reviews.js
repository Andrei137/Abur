import requestService from '@services/request.js';
import { handleValidation } from '@services/validation.js';

const {
    createReview,
    updateReview,
    deleteReview,
    findReviewById,
    findGameByField,
    findReviewByFields,
    findLibraryItemByFields,
} = requestService;

const validator = async (validationData) => {
    const {
        rating = null,
        id = null,
        gameId = null,
        userId = null,
    } = validationData;

    if (id === null) {
        // Create
        if (rating === null) {
            return 'Rating is not given';
        }
        if (rating < 0 || rating > 10) {
            return 'Rating not between 0 and 10';
        }
        if (
            (await findLibraryItemByFields(
                ['gameId', 'customerId'],
                [gameId, userId]
            )) === null
        ) {
            return 'Customer cannot leave review for a game they do not own';
        }
        if (
            (await findReviewByFields(['gameId', 'customerId'], [gameId, userId])) !==
      null
        ) {
            return 'Customer already left a review for this game';
        }
    } else {
        // Delete and Update
        const review = await findReviewById(id);
        if (!review) {
            return 'Review does not exist';
        }
        if (review.customerId !== userId) {
            return 'Cannot mutate other user\'s review';
        }
        if (rating !== null && (rating < 0 || rating > 10)) {
            return 'Updated rating not between 0 and 10';
        }
    }
    return null;
};

const validateReview = async (validationData) =>
    await handleValidation(validator, validationData);

export const validateAndCreateReview = async ({ review, game, userId }) => {
    const gameId = (await findGameByField('name', game)).id;
    await validateReview({ rating: review.rating, gameId, userId });

    return await createReview({
        ...review,
        customerId: userId,
        gameId,
    });
};

export const validateAndUpdateReview = async ({ id, userId, review }) => {
    await validateReview({ id, userId, rating: review.rating });
    return await updateReview(id, review);
};

export const validateAndDeleteReview = async ({ id, userId }) => {
    await validateReview({ id, userId });
    return await deleteReview(id);
};
