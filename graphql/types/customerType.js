import { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLNonNull } from "graphql";

const customerType = new GraphQLObjectType({
    name: 'Customer',
    fields: {
        id: { type: new GraphQLNonNull(GraphQLInt) },
        username: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },

        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        // TODO
    }
});

export default customerType;
