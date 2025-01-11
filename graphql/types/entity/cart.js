import {
    GraphQLList,
    GraphQLObjectType,
} from 'graphql';
import {
    findDLCsInCartByCustomerId,
    findGamesInCartByCustomerId,
} from '@repositories/games.js';
import gameType from './game.js';
import customerType from './customer.js';
import unionGameDLCType from './unionGameDLC.js'
import requestService from '@services/request.js';

const {
    findAllDLCs,
    findAllGames,
    findCustomerById,
} = requestService;

export default new GraphQLObjectType({
    name: 'Cart',
    fields: () => ({
        customer: {
            type: customerType,
            resolve: async ({ userId }) =>
                await findCustomerById(userId, {
                    joinWith: 'User',
                }),
        },
        items   : {
            type: new GraphQLList(unionGameDLCType),
            resolve: async ({ userId }) => {
                // TODO: refactoring
                const gameIds = (await findGamesInCartByCustomerId(userId)).map(game => game.id);
                const dlcIds = (await findDLCsInCartByCustomerId(userId)).map(dlc => dlc.id);
                const games = await findAllGames();
                const dlcs = await findAllDLCs({
                    joinWith: 'Game'
                });
                return [
                    ...games.filter(({ id }) => gameIds.includes(id)),
                    ...dlcs.filter(({ id }) => dlcIds.includes(id)),
                ];
            },
        },
    }),
});
