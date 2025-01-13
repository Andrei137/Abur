import {
    GraphQLString,
    GraphQLInputObjectType,
} from 'graphql';

export default new GraphQLInputObjectType({
    name  : 'DeveloperInput',
    fields: {
        username: { type: GraphQLString },
        password: { type: GraphQLString },
        email   : { type: GraphQLString },
        studio  : { type: GraphQLString },
        website : { type: GraphQLString },
    },
});
