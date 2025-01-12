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

const getIdsByGame = async (gameId, storedIn) => {
    const fetchItems = {
        library: async () => await findLibraryItemsByField('gameId', gameId),
        wishlist: async () => await findWishlistItemsByField('gameId', gameId),
    };
    return (await fetchItems[storedIn]()).map((item) => item.customerId);
};

const getNrItemsByType = async (id, type) => {
    const [ids, games] = await Promise.all([
        (async () =>
            (await findLibraryItemsByField('customerId', id))
                .map(item => item.gameId)
        )(),
        findAllGames()
    ]);

    return games
        .filter(game => game.type === type && ids.includes(game.id))
        .length;
};

const getTopByField = async (id, field) => {
    const [ids, games] = await Promise.all([
        (async () =>
            (await findLibraryItemsByField('customerId', id))
                .map(item => item.gameId)
        )(),
        findAllGames()
    ]);

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
    await getIdsByGame(gameId, 'library');

export const findCustomersByGameInWishlist = async gameId =>
    await getIdsByGame(gameId, 'wishlist');

export const getNrGames = async id => await getNrItemsByType(id, 'game');

export const getNrDLCs = async id => await getNrItemsByType(id, 'dlc');

export const getTopYear = async id =>
    new Date(await getTopByField(id, 'releaseDate')).getFullYear();

export const getTopDeveloper = async id =>
    await findDeveloperById(await getTopByField(id, 'developerId'), {
        joinWith: 'User'
    });
