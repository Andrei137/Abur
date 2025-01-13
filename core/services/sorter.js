import requestService from '@services/request.js';
import {
    findGameSales,
    findActualPrice,
    findGameWishlists,
    findGamePopularity,
    findGameAverageRating,
    findPurchaseDateByCustomer,
} from '@repositories/games.js';

const { findDeveloperById } = requestService;

const sort = async (list, getSortKey, order = 'ascending') => {
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
    price: game => findActualPrice(game),
    releaseDate: game => game.releaseDate,
    discount: game => game.discountPercentage,
    sales: async ({ id }) => await findGameSales(id),
    wishlists: async ({ id }) => await findGameWishlists(id),
    rating: async ({ id }) => await findGameAverageRating(id),
    popularity: async ({ id }) => await findGamePopularity(id),
    purchaseDate: async game => await findPurchaseDateByCustomer(game),
    developer: async ({ developerId }) =>
        (await findDeveloperById(developerId, {
            joinWith: 'User',
        })).username,
};

const selectGameOption = key =>
    gamesOptions[key] || gamesOptions.default;

const selectOrder = order =>
    order === 'descending' ? 'descending' : 'ascending';

export const sortGames = async (list, sortOption, order) =>
    await sort(list, selectGameOption(sortOption), selectOrder(order));
