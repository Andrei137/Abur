import { GraphQLString, GraphQLInputObjectType, GraphQLInt } from 'graphql';

export default new GraphQLInputObjectType({
    name  : 'ReviewInput',
    fields: {
        rating : { type: GraphQLInt },
        comment: { type: GraphQLString },
    },
});
