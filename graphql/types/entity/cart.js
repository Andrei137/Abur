import gameType from './game.js';
import customerType from './customer.js';
import unionGameDLC from './unionGameDLC.js'
import requestService from '@services/request.js';
import { findGamesInCartByCustomerId, findDLCsInCartByCustomerId } from '@repositories/games.js';
import { GraphQLObjectType, GraphQLList } from 'graphql';

const { findCustomerById, findAllGames, findAllDLCs } = requestService;

export default new GraphQLObjectType({
    name: 'Cart',
    fields: () => ({
        customer: {
            type: customerType,
            resolve: async ({ userId }) => {
                return await findCustomerById(userId, {
                    joinWith: 'User',
                });
            },
        },
        games: {
            type: new GraphQLList(unionGameDLC),
            resolve: async ({ userId }) => {
                // TODO: refactoring
                const gameIds = (await findGamesInCartByCustomerId(userId)).map(game => game.id);
                const dlcIds = (await findDLCsInCartByCustomerId(userId)).map(dlc => dlc.id);
                const games = await findAllGames();
                const dlcs = await findAllDLCs({
                    joinWith: 'Game'
                });
                console.log('GAMEIDS', gameIds);
                console.log('DLCIDS', dlcIds);
                console.log(...games.filter(({ id }) => gameIds.includes(id)));
                console.log(...dlcs.filter(({ id }) => dlcIds.includes(id)));
                return [
                    ...games.filter(({ id }) => gameIds.includes(id)),
                    ...dlcs.filter(({ id }) => dlcIds.includes(id)),
                ];
            },
        },
    }),
});
