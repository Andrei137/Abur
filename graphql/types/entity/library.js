import dlcType from './game.js';
// import ownedGameType from "./ownedGame.js";
import gameType from './game.js';

import requestService from '@services/request.js';
import customerType from './customer.js';
import { getByCustomerId } from '@repositories/games.js';
import { GraphQLObjectType, GraphQLList } from 'graphql';
const { findCustomerById } = requestService;

export default new GraphQLObjectType({
    name: 'Library',
    fields: {
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
                return (await getByCustomerId(userId, 'game')).map((game) => ({
                    ...game,
                    userId,
                }));
            },
        },
    },
});
