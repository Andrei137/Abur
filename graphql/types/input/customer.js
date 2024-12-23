import {
    GraphQLString,
    GraphQLInputObjectType,
} from 'graphql';

export default new GraphQLInputObjectType({
    name: 'CustomerInput',
    fields: {
        username : { type: GraphQLString },
        password : { type: GraphQLString },
        email    : { type: GraphQLString },
        firstName: { type: GraphQLString },
        lastName : { type: GraphQLString },
    },
});
