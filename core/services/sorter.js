import requestService from '@services/request.js';
import {
    findGameSales,
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
    releaseDate: game => game.releaseDate,
    price: game => game.price,
    discount: game => game.discountPercentage,
    sales: async game => await findGameSales(game.id),
    popularity: async game => await findGamePopularity(game.id),
    rating: async game => await findGameAverageRating(game.id),
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
