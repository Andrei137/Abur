import {
    GraphQLList,
    GraphQLObjectType,
} from 'graphql';
import customerType from './customer.js';
import unionGameDLCType from './unionGameDLC.js'
import requestService from '@services/request.js';
import { filterGames, getIdsByCustomer } from '@repositories/games.js';

const {
    findAllDLCs,
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
                const [ids, games, dlcs] = await Promise.all([
                    getIdsByCustomer(userId, 'cart'),
                    filterGames(),
                    findAllDLCs({
                        joinWith: 'Game'
                    }),
                ]);
                return [
                    ...games.filter(({ id }) => ids.includes(id)),
                    ...dlcs.filter(({ id }) => ids.includes(id)),
                ];
            },
        },
    }),
});
