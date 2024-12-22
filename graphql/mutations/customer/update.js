import requestService from '@services/request.js';
import customerType from '@types/entity/customer.js';
import { encrypt } from '@services/authentication.js';
import customerInputType from '@types/input/customer.js';

const { findUserById, findCustomerById } = requestService;
const { updateUser, updateCustomer } = requestService;

const updateCustomerMutationResolver = async (_, input, context) => {
    if (!context.user_id) {
        return false;
    }

    const [user, customer] = await Promise.all([
        findUserById(context.user_id),
        findCustomerById(context.user_id)
    ]);

    if (!user || !customer) {
        return false;
    }

    const [updatedUser, updatedCustomer] = await Promise.all([
        updateUser(user, {
            ...input.customer,
            password: await encrypt(input.customer.password),
        }),
        updateCustomer(customer, {
            ...input.customer,
        })
    ]);

    return {
        ...updatedUser.dataValues,
        ...updatedCustomer.dataValues,
    };
}

const updateCustomerMutation = {
    type: customerType,
    args: {
        customer: { type: customerInputType },
    },
    resolve: updateCustomerMutationResolver,
};

export default updateCustomerMutation;
