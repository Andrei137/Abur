import {
    GraphQLList,
    GraphQLObjectType,
} from 'graphql';
import unionGameDLCType from './unionGameDLC.js';
import { sortGames } from '@services/sorter.js';
import {
    populateAllGames,
    findIdsByCustomer,
} from '@repositories/games.js';

export default new GraphQLObjectType({
    name: 'Store',
    fields: () => ({
        items: {
            type   : new GraphQLList(unionGameDLCType),
            resolve: async ({ userId, sortOption, order, hideOwned }) => {
                const inLibraryIds = hideOwned === false
                    ? []
                    : await findIdsByCustomer(userId, 'library');

                return await sortGames(
                    (await populateAllGames()).filter(({ id }) => !inLibraryIds.includes(id)),
                    sortOption,
                    order
                );
            },
        },
    }),
});
