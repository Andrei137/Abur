import requestService from '@services/request.js';
import { handleValidation } from '@services/validation.js';
import { validateAndCreateUser, validateAndUpdateUser } from '@repositories/user.js';

const { createCustomer, updateCustomer } = requestService;

const validator = async (/*validationData*/) => {
    return null;
};

const validateCustomer = async (validationData) =>
    await handleValidation(validator, validationData);

export const validateAndCreateCustomer = async (customer) => {
    await validateCustomer(customer);

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
    await validateCustomer(customer);

    const updatedUser = await validateAndUpdateUser(userId, customer);
    const updatedCustomer = await updateCustomer(userId, customer);

    return {
        ...updatedUser,
        ...updatedCustomer,
    };
}
