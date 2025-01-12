import {
    GraphQLInt,
    GraphQLObjectType
} from 'graphql';
import developerType from './developer.js';
import {
    getNrDLCs,
    getNrGames,
    getTopYear,
    getTopDeveloper,
} from '@repositories/customers.js';

export default new GraphQLObjectType({
    name: 'CustomerStats',
    fields: () => ({
        gamesOwned: {
            type: GraphQLInt,
            resolve: async id => await getNrGames(id),
        },
        dlcsOwned: {
            type: GraphQLInt,
            resolve: async id => await getNrDLCs(id),
        },
        topYear: {
            type: GraphQLInt,
            resolve: async id => await getTopYear(id),
        },
        topDeveloper: {
            type: developerType,
            resolve: async id => await getTopDeveloper(id),
        },
    }),
});
