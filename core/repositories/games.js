import requestService from '@services/request.js';
import { handleValidation } from '@services/validation.js';

const {
    createGame,
    createDLC,
    findAllDLCs,
    findGameById,
    findAllGames,
    findGameByField,
    findGamesByField,
    findLibraryItemsByField,
} = requestService;

const validator = async (validationData) => {
    const { id = null, name = null, type = 'game' } = validationData;
    if (id !== null) {
        const game = await findGameById(id);
        const { userId = game?.developerId } = validationData;

        if (!game) return 'Not found';
        if (game.type !== type) return 'Invalid type';
        if (game.developerId !== userId) return 'Unauthorized';
    }
    if (name !== null) {
        const game = await findGameByField('name', name);

        if (game) return 'Name already exists';
    }
    return null;
};

export const validateGame = async (validationData) =>
    await handleValidation(validator, validationData);

export const filterGames = async (props) => {
    const { type = 'game', field = null, value } = props;
    return (
        field ? await findGamesByField(field, value) : await findAllGames()
    ).filter((game) => game.type === type);
};

export const validateAndCreateDLC = async (dlc, forGame, userId) => {
    const baseGame = await findGameByField('name', forGame);
    if (!baseGame) return new Error('Base game not found');

    const developerId = baseGame.developerId;
    if (developerId !== userId) return new Error('Unauthorized');

    const createdDLC = await createGame({
        ...dlc,
        developerId,
        type: 'dlc',
    });
    if (!createdDLC) return new Error('Failed to create DLC');

    await createDLC({
        id: createdDLC.id,
        baseGameId: baseGame.id,
    });

    return createdDLC;
};

const findByCustomerId = async (customerId, type) => {
    const ownedGamesIds = (
        await findLibraryItemsByField('customerId', customerId)
    ).map((libraryItem) => libraryItem.gameId);

    // TODO: refactoring
    const allGames = type === 'game'
        ? await filterGames({ type })
        : (await findAllDLCs({
            joinWith: 'Game',
          })).filter((dlc) => dlc.type === 'dlc');
    return allGames.filter((game) => ownedGamesIds.includes(game.id));
};

export const findGamesByCustomerId = async customerId =>
    await findByCustomerId(customerId, 'game');
export const findDLCsByCustomerId = async customerId =>
    await findByCustomerId(customerId, 'dlc');
