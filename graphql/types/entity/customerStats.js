import {
    GraphQLInt,
    GraphQLObjectType
} from 'graphql';
import developerType from './developer.js';
import {
    findNrDLCs,
    findNrGames,
    findTopYear,
    findTopDeveloper,
} from '@repositories/customers.js';

export default new GraphQLObjectType({
    name  : 'CustomerStats',
    fields: () => ({
        gamesOwned: {
            type   : GraphQLInt,
            resolve: async id => await findNrGames(id),
        },
        dlcsOwned: {
            type   : GraphQLInt,
            resolve: async id => await findNrDLCs(id),
        },
        topYear: {
            type   : GraphQLInt,
            resolve: async id => await findTopYear(id),
        },
        topDeveloper: {
            type   : developerType,
            resolve: async id => await findTopDeveloper(id),
        },
    }),
});
