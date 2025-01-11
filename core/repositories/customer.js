import requestService from '@services/request.js';
import { handleValidation } from '@services/validation.js';
import { validateAndCreateUser, validateAndUpdateUser } from '@repositories/user.js';

const {
    createCustomer,
    updateCustomer
} = requestService;

export const validateAndCreateCustomer = async (customer) => {
    const createdUser = await validateAndCreateUser(customer);
    const createdCustomer = await createCustomer({
        ...customer,
        id: createdUser.id,
    });

    return {
        ...createdUser,
        ...createdCustomer,
    };
};

export const validateAndUpdateCustomer = async (userId, customer) => {
    const [updatedUser, updatedCustomer] = await Promise.all([
        validateAndUpdateUser(userId, customer),
        updateCustomer(userId, customer),
    ]);

    return {
        ...updatedUser,
        ...updatedCustomer,
    };
}
