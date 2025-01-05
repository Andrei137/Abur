import customerType from '@types/entity/customer.js';
import customerInputType from '@types/input/customer.js';
import { validateAndCreateCustomer } from '@repositories/customer.js';

const createCustomerMutationResolver = async (_, { customer }) => {
    return await validateAndCreateCustomer(customer);
}

export default {
    type: customerType,
    args: {
        customer: { type: customerInputType },
    },
    resolve: createCustomerMutationResolver,
};
