import {
    GraphQLInt,
    GraphQLList,
    GraphQLString,
    GraphQLNonNull,
    GraphQLObjectType,
} from 'graphql';
import dlcType from './dlc.js';
import gameType from './game.js';
import devStatsType from './devStats.js';
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
            type: devStatsType,
            resolve: async ({ id }) => id,
        },
    }),
});
