import {
    GraphQLInt,
    GraphQLList,
    GraphQLString,
    GraphQLNonNull,
    GraphQLObjectType,
} from 'graphql';
import { filterGames } from '@repositories/games.js';
import gameType from './game.js';

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
    }),
});
