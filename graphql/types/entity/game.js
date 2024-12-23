import GraphQLDate from 'graphql-date';
import developerType from './developer.js';
import requestService from '@services/request.js';
import {
    GraphQLInt,
    GraphQLFloat,
    GraphQLString,
    GraphQLNonNull,
    GraphQLObjectType,
} from 'graphql';

const { findDeveloperById } = requestService;

export default new GraphQLObjectType({
    name: 'Game',
    fields: () => ({
        id         : { type: new GraphQLNonNull(GraphQLInt) },
        name       : { type: new GraphQLNonNull(GraphQLString) },
        price      : { type: new GraphQLNonNull(GraphQLFloat) },
        releaseDate: { type: GraphQLDate },
        developer  : {
            type   : developerType,
            resolve: async game => await findDeveloperById(game.developerId, {
                joinWith: 'User'
            }),
        },
    }),
});
