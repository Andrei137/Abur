import {
    GraphQLString,
    GraphQLNonNull,
    GraphQLInputObjectType,
} from 'graphql';

export default new GraphQLInputObjectType({
    name: 'LoginInput',
    fields: {
        username: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },
    },
});
