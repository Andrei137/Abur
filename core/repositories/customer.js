import requestService from '@services/request.js';
import { handleValidation } from '@services/validation.js';
import { validateAndCreateUser } from '@repositories/user.js';

const { createCustomer } = requestService;

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
