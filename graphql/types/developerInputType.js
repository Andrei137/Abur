import {
    GraphQLInputObjectType,
    GraphQLString
} from 'graphql';

const developerInputType = new GraphQLInputObjectType({
    name: 'DeveloperInput',
    fields: {
        username: { type: GraphQLString },
        password: { type: GraphQLString },
        email: { type: GraphQLString },

        studio: { type: GraphQLString },
        website: { type: GraphQLString },
    // TODO
    },
});

export default developerInputType;
