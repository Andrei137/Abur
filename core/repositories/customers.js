import requestService from '@services/request.js';
import {
    validateAndCreateUser,
    validateAndUpdateUser,
} from '@repositories/users.js';

const {
    findAllGames,
    createCustomer,
    updateCustomer,
    findDeveloperById,
    findLibraryItemsByField,
    findWishlistItemsByField,
} = requestService;

export const validateAndCreateCustomer = async ({ customer }) => {
    const createdUser = await validateAndCreateUser({ user: customer });
    const createdCustomer = await createCustomer({
        ...customer,
        id: createdUser.id,
    });

    return {
        ...createdUser,
        ...createdCustomer,
    };
};

export const validateAndUpdateCustomer = async ({ userId, customer }) => {
    const [updatedUser, updatedCustomer] = await Promise.all([
        validateAndUpdateUser({ userId, user: customer }),
        updateCustomer(userId, customer),
    ]);

    return {
        ...updatedUser,
        ...updatedCustomer,
    };
};

const findIdsByGame = async (gameId, storedIn) => {
    const fetchItems = {
        library: async () => await findLibraryItemsByField('gameId', gameId),
        wishlist: async () => await findWishlistItemsByField('gameId', gameId),
    };
    return (await fetchItems[storedIn]()).map((item) => item.customerId);
};

const findAllGamesAndLibraryIds = async id =>
    await Promise.all([
        (async () =>
            (await findLibraryItemsByField('customerId', id)
            ).map(item => item.gameId)
        )(),
        findAllGames()
    ]);

const findNrItemsByType = async (id, type) => {
    const [ids, games] = await findAllGamesAndLibraryIds(id);

    return games
        .filter(game => game.type === type && ids.includes(game.id))
        .length;
};

const findTopByField = async (id, field) => {
    const [ids, games] = await findAllGamesAndLibraryIds(id);

    const counter = games
        .filter(game => ids.includes(game.id))
        .map(game => game[field])
        .reduce((acc, item) => {
            acc[item] = (acc[item] || 0) + 1;
            return acc;
        }, {});

    if (Object.keys(counter).length === 0) {
        return null;
    }

    return Object.keys(counter).reduce((a, b) =>
        counter[a] > counter[b] ? a : b
    );
};

export const findCustomersByGameInLibrary = async gameId =>
    await findIdsByGame(gameId, 'library');

export const findCustomersByGameInWishlist = async gameId =>
    await findIdsByGame(gameId, 'wishlist');

export const findNrGames = async id => await findNrItemsByType(id, 'game');

export const findNrDLCs = async id => await findNrItemsByType(id, 'dlc');

export const findTopYear = async id =>
    new Date(await findTopByField(id, 'releaseDate')).getFullYear();

export const findTopDeveloper = async id =>
    await findDeveloperById(await findTopByField(id, 'developerId'), {
        joinWith: 'User'
    });
