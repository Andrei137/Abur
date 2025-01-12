import requestService from '@services/request.js';
import {
    filterGames,
    getIdsByCustomer,
} from '@repositories/games.js';
import { validateAndCreateCartItem } from '@repositories/carts.js'; 
import { sendError } from '@services/validation.js';

const {
    findGameById,
    findAllDLCs,
    findWishlistItemsByFields,
    findLibraryItemsByFields,
    createWishlistItem,
    deleteWishlistItemsByField,
    findWishlistItemByFields,
    deleteWishlistItemsByFields,
    findAllGames,
} = requestService;

export const validateAndCreateWishlistItem = async ({ gameId, customerId }) => {
    // item NU exista in db
    if ((await findGameById(gameId)) === null) {
        await sendError('Select a valid item from the store');
    }

    // item NU este deja in wishlist
    if ((await findWishlistItemsByFields(['gameId', 'customerId'], [gameId, customerId])).length !== 0) {
        await sendError('This item is already in your wishlist');
    }

    // item NU este deja in library
    if ((await findLibraryItemsByFields(['gameId', 'customerId'], [gameId, customerId])).length !== 0) {
        await sendError('This item is already in your library');
    }

    return await createWishlistItem({ gameId, customerId });
}

export const deleteWishlistItems = async ({ userId }) => {
    return await deleteWishlistItemsByField('customerId', userId);
};

export const validateAndDeleteWishlistItem = async ({ gameId, customerId }) => {
    // item NU exista in wishlist
    if ((await findWishlistItemByFields(['gameId', 'customerId'], [gameId, customerId])) === null) {
        await sendError('This item is not in your wishlist');
    }

    return await deleteWishlistItemsByFields(['gameId', 'customerId'], [gameId, customerId]);
};

export const getWishlistItems = async (customerId) => {
    const [ids, games, dlcs] = await Promise.all([
        getIdsByCustomer(customerId, 'wishlist'),
        filterGames(),
        findAllDLCs({
            joinWith: 'Game',
        }),
    ]);

    return [
        ...games.filter(({ id }) => ids.includes(id)),
        ...dlcs.filter(({ id }) => ids.includes(id)),
    ];
}

export const validateAndMoveItemToCart = async ({ gameId, customerId }) => {
    return await validateAndCreateCartItem({ gameId, customerId });
}

export const validateAndMoveAllItemsToCart = async (customerId) => {
    const [ids, games] = await Promise.all([
        getIdsByCustomer(customerId, 'wishlist'),
        findAllGames()
    ]);

    await Promise.all(games
        .filter(({ id }) => ids.includes(id))
        .map(game => { validateAndCreateCartItem({ gameId: game.id, customerId })
            .catch(() => null) })
    );
}
