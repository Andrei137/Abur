import {
    GraphQLInt,
    GraphQLString,
    GraphQLNonNull,
    GraphQLInterfaceType,
} from 'graphql';

export default new GraphQLInterfaceType({
    name  : 'User',
    fields: {
        id      : { type: new GraphQLNonNull(GraphQLInt) },
        username: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },
        email   : { type: new GraphQLNonNull(GraphQLString) },
    },
});
