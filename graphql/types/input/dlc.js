import GraphQLDate from 'graphql-date';
import {
    GraphQLFloat,
    GraphQLString,
    GraphQLInputObjectType,
} from 'graphql';

export default new GraphQLInputObjectType({
    name: 'DLCInput',
    fields: {
        name       : { type: GraphQLString },
        price      : { type: GraphQLFloat },
        releaseDate: { type: GraphQLDate },
    },
});
