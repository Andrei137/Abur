import requestService from '@services/request.js';

const { findDeveloperById } = requestService;

export const sort = async (list, sortFunction, order = "ascending") => {
    const sortedList = (await Promise.all(
            list.map(async item => ({
                item,
                sortKey: await sortFunction(item)
            }))
        ))
        .sort((a, b) => a.sortKey > b.sortKey ? 1 : -1)
        .map(({ item }) => item);

    return order === "ascending"
        ? sortedList
        : sortedList.reverse();
};

const gamesOptions = {
    default    : game => game.id,
    name       : game => game.name,
    releaseDate: game => game.releaseDate,
    developer  : async game =>
        (await findDeveloperById(game.developerId, {
            joinWith: 'User'
        })).username,
};

export const selectGameOption = key => gamesOptions[key] || gamesOptions.default;
export const selectOrder = order => order === 'descending' ? 'descending' : 'ascending';
