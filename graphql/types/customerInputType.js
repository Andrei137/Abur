import {
    GraphQLInputObjectType,
    GraphQLString,
} from 'graphql';

const customerInputType = new GraphQLInputObjectType({
    name: 'CustomerInput',
    fields: {
        username: { type: GraphQLString },
        password: { type: GraphQLString },
        email: { type: GraphQLString },

        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
    // TODO
    },
});

export default customerInputType;
