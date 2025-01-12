import {
    GraphQLInt,
    GraphQLList,
    GraphQLString,
    GraphQLNonNull,
    GraphQLObjectType,
} from 'graphql';
import dlcType from './dlc.js';
import gameType from './game.js';
import developerStatsType from './developerStats.js';
import { filterGames } from '@repositories/games.js';

export default new GraphQLObjectType({
    name: 'Developer',
    fields: () => ({
        id: { type: new GraphQLNonNull(GraphQLInt) },
        username: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        studio: { type: new GraphQLNonNull(GraphQLString) },
        website: { type: GraphQLString },
        games: {
            type: new GraphQLList(gameType),
            resolve: async ({ id }) =>
                await filterGames({
                    field: 'developerId',
                    value: id,
                }),
        },
        stats: {
            type: developerStatsType,
            resolve: async ({ id }) => id,
        },
    }),
});
