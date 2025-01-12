import requestService from '@services/request.js';
import { handleValidation } from '@services/validation.js';
import {
    validateAndCreateUser,
    validateAndUpdateUser,
} from '@repositories/users.js';
import { findDLCsByDeveloperId } from '@repositories/dlcs.js';
import { filterGames } from '@repositories/games.js';
import { sort, selectGameOption } from '@services/sorter.js';

const {
    createDeveloper,
    updateDeveloper,
    findDeveloperByField
} = requestService;

const validator = async (validationData) => {
    const { id = null, studio = null } = validationData;

    if (id !== null) {
        // Update
        if (studio !== null && (await findDeveloperByField('studio', studio)))
            return 'studio already exists';
    }
    else {
        // Create
        if (studio === null) return 'studio cannot be null';
        if (studio !== null && (await findDeveloperByField('studio', studio)))
            return 'studio already exists';
    }

    return null;
};

const validateDeveloper = async (validationData) =>
    await handleValidation(validator, validationData);

export const validateAndCreateDeveloper = async ({ developer }) => {
    await validateDeveloper(developer);
    const createdUser = await validateAndCreateUser({ user: developer });
    const createdDeveloper = await createDeveloper({
        ...developer,
        id: createdUser.id,
    });

    return {
        ...createdUser,
        ...createdDeveloper,
    };
};

export const validateAndUpdateDeveloper = async ({ userId, developer }) => {
    await validateDeveloper({ id: userId, developer });
    const updatedUser = await validateAndUpdateUser({ userId, user: developer });
    const updatedDeveloper = await updateDeveloper(userId, developer);

    return {
        ...updatedUser,
        ...updatedDeveloper,
    };
};

const getBestGameByOption = async (developerId, option) =>
    (await sort(
        await filterGames({
            field: 'developerId',
            value: developerId,
        }),
        selectGameOption(option),
        'descending'
    ))[0];

const getBestDLCByOption = async (developerId, option) =>
    (await sort(
        await findDLCsByDeveloperId(developerId),
        selectGameOption(option),
        'descending'
    ))[0];

export const getBestRatedGame = async developerId =>
    await getBestGameByOption(developerId, 'rating');

export const getBestSelledGame = async developerId =>
    await getBestGameByOption(developerId, 'sales');

export const getMostPopularGame = async developerId =>
    await getBestGameByOption(developerId, 'popularity');

export const getBestRatedDLC = async developerId =>
    await getBestDLCByOption(developerId, 'rating');

export const getBestSelledDLC = async developerId =>
    await getBestDLCByOption(developerId, 'sales');

export const getMostPopularDLC = async developerId =>
    await getBestDLCByOption(developerId, 'popularity');
