import {
    GraphQLList,
    GraphQLObjectType,
} from 'graphql';
import gameType from './game.js';
import customerType from './customer.js';
import requestService from '@services/request.js';
import { findGamesInLibraryByCustomerId } from '@repositories/games.js';

const { findCustomerById } = requestService;

export default new GraphQLObjectType({
    name: 'Library',
    fields: () => ({
        customer: {
            type: customerType,
            resolve: async ({ userId }) =>
                await findCustomerById(userId, {
                    joinWith: 'User',
                }),
        },
        games   : {
            type: new GraphQLList(gameType),
            resolve: async ({ userId }) =>
                (await findGamesInLibraryByCustomerId(userId, 'game'))
                .map(game => ({ ...game, userId })),
        },
    }),
});
