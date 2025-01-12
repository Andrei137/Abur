import requestService from '@services/request.js';
import {
    filterGames,
    getIdsByCustomer
} from '@repositories/games.js';
import { sendError } from '@services/validation.js';

const {
    findGameById,
    findAllDLCs,
    findWishlistItemsByFields,
    findLibraryItemsByFields,
    createWishlistItem
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
