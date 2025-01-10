import gameType from './game.js';
import customerType from './customer.js';
import requestService from '@services/request.js';
import { findGamesInLibraryByCustomerId } from '@repositories/games.js';
import { GraphQLObjectType, GraphQLList } from 'graphql';

const { findCustomerById } = requestService;

export default new GraphQLObjectType({
    name: 'Library',
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
            type: new GraphQLList(gameType),
            resolve: async ({ userId }) => {
                return (await findGamesInLibraryByCustomerId(userId, 'game')).map((game) => ({
                    ...game,
                    userId,
                }));
            },
        },
    }),
});
