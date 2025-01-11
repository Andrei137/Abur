import requestService from '@services/request.js';
import { handleValidation } from '@services/validation.js';

const {
    createGame,
    updateGame,
    deleteGame,
    deleteDLCsByField,
    createDLC,
    findAllDLCs,
    findGameById,
    findAllGames,
    findGameByField,
    findGamesByField,
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
}

export const filterGames = async (props) => {
    const { type = 'game', field = null, value } = props;
    return (
        field ? await findGamesByField(field, value) : await findAllGames()
    ).filter((game) => game.type === type);
};

const findByCustomerId = async (customerId, type, storedIn) => {
    const fetchStoredItems = {
        library: async () => await findLibraryItemsByField('customerId', customerId),
        cart: async () => await findCartItemsByField('customerId', customerId),
    };
    const storedItems = fetchStoredItems[storedIn]
        ? await fetchStoredItems[storedIn]()
        : [];
    const ownedGamesIds = storedItems.map((item) => item.gameId);

    // TODO: refactoring
    const allGames = type === 'game'
        ? await filterGames({ type })
        : (await findAllDLCs({
            joinWith: 'Game',
          })).filter((dlc) => dlc.type === 'dlc');
    return allGames.filter((game) => ownedGamesIds.includes(game.id));
};

export const findGamesInLibraryByCustomerId = async customerId =>
    await findByCustomerId(customerId, 'game', 'library');
export const findDLCsInLibraryByCustomerId = async customerId =>
    await findByCustomerId(customerId, 'dlc', 'library');
export const findGamesInCartByCustomerId = async customerId =>
    await findByCustomerId(customerId, 'game', 'cart');
export const findDLCsInCartByCustomerId = async customerId =>
    await findByCustomerId(customerId, 'dlc', 'cart');
