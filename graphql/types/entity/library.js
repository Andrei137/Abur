import {
    GraphQLList,
    GraphQLObjectType,
} from 'graphql';
import gameType from './game.js';
import customerType from './customer.js';
import { sortGames } from '@services/sorter.js';
import requestService from '@services/request.js';
import { findGamesInLibraryByCustomerId } from '@repositories/games.js';

const { findCustomerById } = requestService;

export default new GraphQLObjectType({
    name  : 'Library',
    fields: () => ({
        customer: {
            type   : customerType,
            resolve: async ({ userId }) =>
                await findCustomerById(userId, {
                    joinWith: 'User',
                }),
        },
        games: {
            type   : new GraphQLList(gameType),
            resolve: async ({ userId, sortOption, order }) => (await sortGames(
                await findGamesInLibraryByCustomerId(userId),
                sortOption,
                order
            )).map(game => ({ ...game, userId })),
        },
    }),
});
