import GraphQLDate from 'graphql-date';
import {
    GraphQLInt,
    GraphQLFloat,
    GraphQLString,
    GraphQLInputObjectType,
} from 'graphql';

export default new GraphQLInputObjectType({
    name: 'GameInput',
    fields: {
        name                : { type: GraphQLString },
        price               : { type: GraphQLFloat },
        discountPercentage  : { type: GraphQLInt },
        releaseDate         : { type: GraphQLDate },
    },
});
