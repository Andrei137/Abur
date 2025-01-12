import requestService from '@services/request.js';
import {
    filterGames,
    getIdsByCustomer
} from '@repositories/games.js';
import { sendError } from '@services/validation.js';

const {
    findAllDLCs,
} = requestService;

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
