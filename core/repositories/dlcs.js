import requestService from '@services/request.js';
import { handleValidation } from '@services/validation.js';
import { validateGame } from './games.js';

const {
    createDLC,
    deleteDLC,
    createGame,
    updateGame,
    deleteGame,
    findDLCById,
    findGameByField,
} = requestService;

const validateDLC = async validationData =>
    await validateGame({ ...validationData, type: 'dlc' });

export const validateAndCreateDLC = async ({ dlc, forGame, userId }) => {
    const baseGame = await findGameByField('name', forGame);
    if (!baseGame) return new Error('Base game not found');

    const developerId = baseGame.developerId;
    if (developerId !== userId) return new Error('Unauthorized');

    await validateDLC({ name: dlc.name });
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

    return { ...createdDLC, baseGameId: baseGame.id };
};

export const validateAndUpdateDLC = async ({ id, dlc, userId }) => {
    await validateDLC({ id, name: dlc.name, userId });
    return { ...(await updateGame(id, dlc)), ...(await findDLCById(id)) };
};

export const validateAndDeleteDLC = async ({ id, userId }) => {
    await validateDLC({ id, userId });
    return await deleteDLC(id) && await deleteGame(id);
};
