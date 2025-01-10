import { GraphQLObjectType } from 'graphql';
import authMutations from '@auth-mutations';
import dlcMutations from '@dlc-mutations';
import gameMutations from '@game-mutations';
import customerMutations from '@customer-mutations';
import developerMutations from '@developer-mutations';
import reviewMutations from '@review-mutations';
import { authHandler } from './authHandler.js';

export default new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        ...authMutations,
        ...authHandler(dlcMutations, 'developer'),
        ...authHandler(gameMutations, 'developer'),
        ...authHandler(customerMutations),
        ...authHandler(developerMutations),
        ...authHandler(reviewMutations),
    },
});
