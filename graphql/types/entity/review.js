import {
    GraphQLInt,
    GraphQLNonNull,
    GraphQLString,
    GraphQLObjectType,
} from 'graphql';
import customerType from './customer.js';
import unionGameDLCType from './unionGameDLC.js';
import requestService from '@services/request.js';

const {
    findDLCById,
    findGameById,
    findCustomerById,
} = requestService;

export default new GraphQLObjectType({
    name: 'Review',
    fields: () => ({
        id      : { type: new GraphQLNonNull(GraphQLInt) },
        rating  : { type: new GraphQLNonNull(GraphQLInt) },
        comment : { type: GraphQLString },
        customer: {
            type   : customerType,
            resolve: async ({ customerId }) => await findCustomerById(customerId),
        },
        game: {
            type   : unionGameDLCType,
            resolve: async ({ gameId }) => {
                const dlc = await findDLCById(gameId, {
                    joinWith: 'Game',
                });
                if (dlc === null) {
                    return await findGameById(gameId);
                }
                return dlc;
            },
        },
    }),
});
