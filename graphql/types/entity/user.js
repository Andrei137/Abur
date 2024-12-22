import {
    GraphQLInt,
    GraphQLInterfaceType,
    GraphQLString,
    GraphQLNonNull,
} from 'graphql';

const userType = new GraphQLInterfaceType({
    name: 'User',
    fields: {
        id: { type: new GraphQLNonNull(GraphQLInt) },
        username: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
    },
});

export default userType;