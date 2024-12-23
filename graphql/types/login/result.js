import {
    GraphQLString,
    GraphQLObjectType,
} from 'graphql';

export default new GraphQLObjectType({
    name: 'LoginResult',
    fields: {
        token: { type: GraphQLString },
    },
});
