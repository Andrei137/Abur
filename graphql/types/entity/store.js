import {
    GraphQLInt,
    GraphQLList,
    GraphQLFloat,
    GraphQLNonNull,
    GraphQLObjectType,
} from 'graphql';
import unionGameDLCType from './unionGameDLC.js';
import requestService from '@services/request.js';
import { sort, selectGameOption, selectOrder } from '@services/sorter.js';

const {
    findDLCById,
    findAllGames,
    findDeveloperById,
    findLibraryItemsByField,
} = requestService;

export default new GraphQLObjectType({
    name: 'Store',
    fields: () => ({
        items: {
            type: new GraphQLList(unionGameDLCType),
            resolve: async ({ userId, sortOption, order, seeOwned }) => {
                if (sortOption === 'purchaseDate') sortOption = 'default';
                if (userId === undefined || (await findDeveloperById(userId)) !== null) seeOwned = false;

                const inLibraryIds = seeOwned === false
                    ? []
                    : (await findLibraryItemsByField('customerId', userId)).map(item => item.gameId);
                const gamesAndDLCs = (await Promise.all(
                    (await findAllGames())
                    .map(async game => game.type === 'dlc'
                        ? await findDLCById(game.id, { joinWith: 'Game' })
                        : game
                ))).filter(item => !inLibraryIds.includes(item.id));

                return await sort(
                    gamesAndDLCs,
                    selectGameOption(sortOption),
                    selectOrder(order)
                );
            },
        },
    }),
});
