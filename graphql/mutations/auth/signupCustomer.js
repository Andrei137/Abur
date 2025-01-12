import customerType from '@types/entity/customer.js';
import customerInputType from '@types/input/customer.js';
import { validateAndCreateCustomer } from '@repositories/customers.js';

const signupCustomerMutationResolver = async (_, { customer }) =>
    await validateAndCreateCustomer({ customer });

export default {
    type: customerType,
    args: {
        customer: { type: customerInputType },
    },
    resolve: signupCustomerMutationResolver,
};
