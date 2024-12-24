import { GraphQLObjectType } from 'graphql';
import authMutations from '@auth-mutations';
import dlcMutations from '@dlc-mutations';
import gameMutations from '@game-mutations';
import customerMutations from '@customer-mutations';
import developerMutations from '@developer-mutations';
import requestService from '@services/request.js';

const { findDeveloperById } = requestService;

const authHandler = (mutations, access = 'all') => Object
    .entries(mutations)
    .reduce((acc, [mutationName, mutation]) => {
        acc[mutationName] = {
            ...mutation,
            resolve: async (_, params, context) => {
                const id = context.userId;
                if (id === undefined) throw new Error('Unauthorized');
                if (access === 'developer' && !(await findDeveloperById(id))) throw new Error('Unauthorized');
                return mutation.resolve(_, params, context);
            }
        };
        return acc;
}, {});

export default new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        ...authMutations,
        ...authHandler(dlcMutations, 'developer'),
        ...authHandler(gameMutations, 'developer'),
        ...authHandler(customerMutations),
        ...authHandler(developerMutations),
    },
});
