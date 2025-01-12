import requestService from '@services/request.js';
import {
    findGameSales,
    findGameWishlists,
    findGamePopularity,
    findGameAverageRating,
    findPurchaseDateByCustomer,
} from '@repositories/games.js';

const { findDeveloperById } = requestService;

export const sort = async (list, getSortKey, order = 'ascending') => {
    const sortedList = (
        await Promise.all(
            list.map(async (item) => ({
                item,
                sortKey: await getSortKey(item),
            }))
        )
    )
        .sort((a, b) => (a.sortKey > b.sortKey ? 1 : -1))
        .map(({ item }) => item);

    return order === 'ascending' ? sortedList : sortedList.reverse();
};

const gamesOptions = {
    default: game => game.id,
    name: game => game.name,
    price: game => game.price,
    releaseDate: game => game.releaseDate,
    discount: game => game.discountPercentage,
    sales: async game => await findGameSales(game.id),
    wishlists: async game => await findGameWishlists(game.id),
    rating: async game => await findGameAverageRating(game.id),
    popularity: async game => await findGamePopularity(game.id),
    purchaseDate: async game => await findPurchaseDateByCustomer(game),
    developer: async game =>
        (
            await findDeveloperById(game.developerId, {
                joinWith: 'User',
            })
        ).username,
};

export const selectGameOption = (key) =>
    gamesOptions[key] || gamesOptions.default;

export const selectOrder = (order) =>
    order === 'descending' ? 'descending' : 'ascending';
