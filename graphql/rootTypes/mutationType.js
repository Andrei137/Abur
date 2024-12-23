import { GraphQLObjectType } from 'graphql';
import authMutations from '@auth-mutations';
import gameMutations from '@game-mutations';
import customerMutations from '@customer-mutations';
import developerMutations from '@developer-mutations';

export default new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        ...authMutations,
        ...gameMutations,
        ...customerMutations,
        ...developerMutations,
    },
});
