import requestService from '@services/request.js';
import customerType from '@types/entity/customer.js';
import { encrypt } from '@services/authentication.js';
import customerInputType from '@types/input/customer.js';

const { updateUser, updateCustomer } = requestService;

const updateCustomerMutationResolver = async (_, { customer }, { user_id }) => {
    if (!user_id) return false;

    const [updatedUser, updatedCustomer] = await Promise.all([
        updateUser(user_id, {
            ...customer,
            password: await encrypt(customer.password),
        }),
        updateCustomer(user_id, customer)
    ]);

    return {
        ...updatedUser.dataValues,
        ...updatedCustomer.dataValues,
    };
}

export default {
    type: customerType,
    args: {
        customer: { type: customerInputType },
    },
    resolve: updateCustomerMutationResolver,
};
