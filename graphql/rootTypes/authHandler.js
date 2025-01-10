import requestService from '@services/request.js';

const { findDeveloperById, findCustomerById } = requestService;

export const authHandler = (mutations, access = 'all') =>
    Object.entries(mutations).reduce((acc, [mutationName, mutation]) => {
        acc[mutationName] = {
            ...mutation,
            resolve: async (_, params, context) => {
                const id = context.userId;
                if (id === undefined) throw new Error('Unauthorized');
                if (access === 'developer' && !(await findDeveloperById(id))) {
                    throw new Error('Unauthorized');
                }
                if (access === 'customer' && !(await findCustomerById(id))) {
                    throw new Error('Unauthorized');
                }
                return mutation.resolve(_, params, context);
            },
        };
        return acc;
    }, {});
