import requestService from '@services/request.js';

const {
    findGameById,
    findGameByField,
    findAllGames
} = requestService;

export const findValidGame = async id => {
    const game = await findGameById(id);
    return game?.type === 'game' && game || null;
};

export const findAllValidGames = async () =>
    (await findAllGames()).filter(game => game.type === 'game');

export const validGameName = async name =>
    !(await findGameByField('name', name));
