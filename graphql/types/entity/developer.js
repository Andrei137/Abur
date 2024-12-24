import gameType from './game.js';
import userType from './user.js';
import requestService from '@services/request.js';
import {
    GraphQLInt,
    GraphQLList,
    GraphQLString,
    GraphQLObjectType,
    GraphQLNonNull,
} from 'graphql';

const { findGamesByField } = requestService;

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
            resolve: async developer => await findGamesByField('developerId', developer.id),
        },
    }),
});
