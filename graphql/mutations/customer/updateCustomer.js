import customerType from '@types/entity/customer.js';
import customerInputType from '@types/input/customer.js';
import { validateAndUpdateCustomer } from '@repositories/customers.js';

const updateCustomerMutationResolver = async (_, { customer }, { userId }) =>
    await validateAndUpdateCustomer({ userId, customer });

export default {
    type: customerType,
    args: {
        customer: { type: customerInputType },
    },
    resolve: updateCustomerMutationResolver,
};
