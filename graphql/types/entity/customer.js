import {
    GraphQLInt,
    GraphQLString,
    GraphQLNonNull,
    GraphQLObjectType,
} from 'graphql';

export default new GraphQLObjectType({
    name: 'Customer',
    fields: {
        id       : { type: new GraphQLNonNull(GraphQLInt) },
        username : { type: new GraphQLNonNull(GraphQLString) },
        password : { type: new GraphQLNonNull(GraphQLString) },
        email    : { type: new GraphQLNonNull(GraphQLString) },
        firstName: { type: GraphQLString },
        lastName : { type: GraphQLString },
    },
});
