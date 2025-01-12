import requestService from '@services/request.js';
import handleValidation from '@services/validation.js';

const {
    createGame,
    updateGame,
    deleteGame,
    findGameById,
    findAllGames,
    findGameByField,
    findGamesByField,
    deleteDLCsByField,
    findDeveloperById,
    findCartItemsByField,
    findLibraryItemsByField,
} = requestService;

const validator = async validationData => {
    const {
        id = null,
        name = null,
        type = 'game'
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
    return null;
};

export const validateGame = async validationData =>
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
    return await deleteDLCsByField('baseGameId', id) && await deleteGame(id);
};

const sortByDeveloper = async game => {
    const developer = await findDeveloperById(game.developerId, {
        joinWith: 'User',
    });
    return developer.username;
}

export const sortBy = {
    name       : game => game.name,
    releaseDate: game => game.releaseDate,
    developer  : sortByDeveloper,
};

export const filterGames = async ({ field = null, value } = {}) =>
    (field ? await findGamesByField(field, value) : await findAllGames())
    .filter(game => game.type === 'game');

export const getIdsByCustomer = async (customerId, storedIn) => {
    const fetchItems = {
        library: async () => await findLibraryItemsByField('customerId', customerId),
        cart: async () => await findCartItemsByField('customerId', customerId),
    };
    return (await fetchItems[storedIn]()).map(item => item.gameId);
};

const findByCustomerId = async (customerId, storedIn) => {
    const ids = await getIdsByCustomer(customerId, storedIn);
    return (await filterGames()).filter(game => ids.includes(game.id));
};

export const findGamesInLibraryByCustomerId = async customerId =>
    await findByCustomerId(customerId, 'library');
export const findGamesInCartByCustomerId = async customerId =>
    await findByCustomerId(customerId, 'cart');
