import dlcType from './game.js';
import gameType from './game.js';
import customerType from './customer.js';
import requestService from '@services/request.js';
import { findGamesByCustomerId } from '@repositories/games.js';
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
                return (await findGamesByCustomerId(userId, 'game')).map((game) => ({
                    ...game,
                    userId,
                }));
            },
        },
    }),
});
