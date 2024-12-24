import requestService from '@services/request.js';
import { handleValidation } from '@services/validation.js';

const {
    createGame,
    createDLC,
    findGameById,
    findAllGames,
    findGameByField,
    findGamesByField,
} = requestService;

const findValidGame = async id => {
    const game = await findGameById(id);
    return game?.type === 'game' && game || null;
};

const validator = async validationData => {
    const { id, name } = validationData;
    if (id !== null) {
        const game = await findValidGame(id);
        const { userId = game?.developerId } = validationData;

        if (!game) return 'Game not found';
        if (game.developerId !== userId) return 'Unauthorized';
    }
    if (name !== null) {
        const game = await findGameByField('name', name);

        if (game) return 'Name already exists';
    }
    return null;
};

export const validateGame = async validationData => await handleValidation(validator, validationData);

export const filterGames = async props => {
    const { type = 'game', field = null, value } = props;
    return (field
        ? await findGamesByField(field, value)
        : await findAllGames()
    ).filter(game => game.type === type);
};

export const validateAndCreateDLC = async (dlc, forGame) => {
    const baseGame = await findGameByField('name', forGame);
    if (!baseGame) return new Error('Base game not found');

    const createdDLC = await createGame({
        ...dlc,
        developerId: baseGame.developerId,
        type: 'dlc'
    });
    if (!createdDLC) return new Error('Failed to create DLC');

    await createDLC({
        id: createdDLC.id,
        baseGameId: baseGame.id
    });

    return createdDLC;
};
