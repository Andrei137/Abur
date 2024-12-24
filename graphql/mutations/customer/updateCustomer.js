import requestService from '@services/request.js';
import customerType from '@types/entity/customer.js';
import { encrypt } from '@services/authentication.js';
import customerInputType from '@types/input/customer.js';

const { updateUser, updateCustomer } = requestService;

const updateCustomerMutationResolver = async (_, { customer }, { userId }) => {
    const [updatedUser, updatedCustomer] = await Promise.all([
        updateUser(userId, {
            ...customer,
            password: await encrypt(customer.password),
        }),
        updateCustomer(userId, customer)
    ]);

    return {
        ...updatedUser,
        ...updatedCustomer,
    };
}

export default {
    type: customerType,
    args: {
        customer: { type: customerInputType },
    },
    resolve: updateCustomerMutationResolver,
};
