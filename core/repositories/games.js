import requestService from '@services/request.js';
import { handleValidation } from '@services/validation.js';
import {
    findCustomersByGameInLibrary,
    findCustomersByGameInWishlist,
} from '@repositories/customers.js';

const {
    createGame,
    updateGame,
    deleteGame,
    findDLCById,
    findGameById,
    findAllGames,
    findGameByField,
    findGamesByField,
    deleteDLCsByField,
    findReviewsByField,
    findCartItemsByField,
    findLibraryItemByFields,
    findLibraryItemsByField,
    findWishlistItemsByField,
} = requestService;

const validator = async (validationData) => {
    const {
        id = null,
        name = null,
        discountPercentage = null,
        type = 'game',
    } = validationData;

    if (id !== null) {
        const game = await findGameById(id);
        const { userId = game?.developerId } = validationData;

        if (!game) return `${type === 'game' ? 'Game' : 'DLC'} not found`;
        if (game.type !== type) return 'Invalid type';
        if (game.developerId !== userId) return 'Unauthorized';
    }
    if (name !== null) {
        const game = await findGameByField('name', name);
        if (game) return 'Name already exists';
    }
    if (
        discountPercentage !== null &&
    !(0 <= discountPercentage && discountPercentage <= 100)
    ) {
        return 'Percentage must be between 0 and 100';
    }
    return null;
};

export const validateGame = async (validationData) =>
    await handleValidation(validator, validationData);

export const validateAndReadGame = async ({ id }) => {
    await validateGame({ id });
    return await findGameById(id);
};

export const validateAndCreateGame = async ({ game, userId }) => {
    await validateGame({ name: game.name, userId });
    return await createGame({
        ...game,
        developerId: userId,
        type: 'game',
    });
};

export const validateAndUpdateGame = async ({ id, game, userId }) => {
    await validateGame({ id, name: game.name, userId });
    return await updateGame(id, game);
};

export const validateAndDeleteGame = async ({ id, userId }) => {
    await validateGame({ id, userId });
    await deleteDLCsByField('baseGameId', id);
    return await deleteGame(id);
};

export const filterGames = async ({ field = null, value } = {}) =>
    (field ? await findGamesByField(field, value) : await findAllGames()
    ).filter(game => game.type === 'game');

export const populateAllGames = async () => await Promise.all(
    (await findAllGames()
    ).map(async game => game.type === 'dlc'
        ? await findDLCById(game.id, { joinWith: 'Game' })
        : game
    ));

export const findIdsByCustomer = async (customerId, storedIn) => {
    const fetchItems = {
        library: async () => await findLibraryItemsByField('customerId', customerId),
        cart: async () => await findCartItemsByField('customerId', customerId),
        wishlist: async () => await findWishlistItemsByField('customerId', customerId),
    };
    return (await fetchItems[storedIn]()).map(item => item.gameId);
};

const findByCustomerId = async (customerId, storedIn) => {
    const ids = await findIdsByCustomer(customerId, storedIn);
    return (await filterGames()).filter(game => ids.includes(game.id));
};

export const findActualPrice = game => game.discountPercentage
    ? game.price - game.price * (game.discountPercentage / 100)
    : game.price;

export const findGamesInLibraryByCustomerId = async customerId =>
    await findByCustomerId(customerId, 'library');

export const findGamesInCartByCustomerId = async customerId =>
    await findByCustomerId(customerId, 'cart');

export const findGameSales = async gameId =>
    (await findCustomersByGameInLibrary(gameId)).length;

export const findGameWishlists = async gameId =>
    (await findCustomersByGameInWishlist(gameId)).length;

export const findGamePopularity = async gameId =>
    (await findCustomersByGameInLibrary(gameId)).length +
    (await findCustomersByGameInWishlist(gameId)).length;

export const findGameAverageRating = async gameId => {
    const gameReviews = await findReviewsByField('gameId', gameId);
    return gameReviews.length !== 0
        ? gameReviews.reduce((acc, review) => acc + review.rating, 0) / gameReviews.length
        : 0;
};

export const findPurchaseDateByCustomer = async ({ id, userId }) =>
    (await findLibraryItemByFields(['customerId', 'gameId'], [userId, id])).purchaseDate;
