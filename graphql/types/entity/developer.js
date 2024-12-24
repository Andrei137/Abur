import dlcType from './game.js';
import gameType from './game.js';
import userType from './user.js';
import { filterGames } from '@repositories/games.js';
import {
    GraphQLInt,
    GraphQLList,
    GraphQLString,
    GraphQLObjectType,
    GraphQLNonNull,
} from 'graphql';

export default new GraphQLObjectType({
    name: 'Developer',
    interfaces: [userType],
    fields: () => ({
        id      : { type: new GraphQLNonNull(GraphQLInt) },
        username: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },
        email   : { type: new GraphQLNonNull(GraphQLString) },
        studio  : { type: new GraphQLNonNull(GraphQLString) },
        website : { type: GraphQLString },

        games: {
            type   : new GraphQLList(gameType),
            resolve: async developer => await filterGames({
                type : 'game',
                field: 'developerId',
                value: developer.id,
            }),
        },
        dlcs: {
            type: new GraphQLList(dlcType),
            resolve: async developer => await filterGames({
                type : 'dlc',
                field: 'developerId',
                value: developer.id,
            }),
        }
    }),
});
