import {
    GraphQLInt,
    GraphQLList,
    GraphQLString,
    GraphQLNonNull,
    GraphQLObjectType,
} from 'graphql';
import dlcType from './dlc.js';
import gameType from './game.js';
import { filterGames } from '@repositories/games.js';
import {
    getBestRatedDLC,
    getBestRatedGame,
    getMostPopularDLC,
    getMostPopularGame,
} from '@repositories/developer.js';

export default new GraphQLObjectType({
    name: 'Developer',
    fields: () => ({
        id      : { type: new GraphQLNonNull(GraphQLInt) },
        username: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },
        email   : { type: new GraphQLNonNull(GraphQLString) },
        studio  : { type: new GraphQLNonNull(GraphQLString) },
        website : { type: GraphQLString },
        games   : {
            type   : new GraphQLList(gameType),
            resolve: async developer => await filterGames({
                field: 'developerId',
                value: developer.id,
            }),
        },
        bestRatedGame: {
            type: gameType,
            resolve: async developer => await getBestRatedGame(developer.id),
        },
        mostPopularGame: {
            type: gameType,
            resolve: async developer => await getMostPopularGame(developer.id),
        },
        bestRatedDLC: {
            type: dlcType,
            resolve: async developer => await getBestRatedDLC(developer.id),
        },
        mostPopularGame: {
            type: dlcType,
            resolve: async developer => await getMostPopularDLC(developer.id),
        },
    }),
});
