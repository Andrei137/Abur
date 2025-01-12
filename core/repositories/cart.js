import requestService from '@services/request.js';
import { handleValidation } from '@services/validation.js';

const {
    createCartItem,
    deleteCartItemsByFields,
    deleteCartItemsByField,
} = requestService;

const validator = async validationData => {
    const {
        gameId = null,
        customerId = null
    } = validationData;

    console.log(gameId);
    console.log(customerId);

    // TODO: validate DELETE
    // item nu exista in cart

    // TODO: validate CREATE
    // item nu exista in db
    // item este deja in library
    // item este deja adaugat in cart

    return null;
};

const validateCartItem = async validationData =>
    await handleValidation(validator, validationData);

export const validateAndCreateCartItem = async ({ gameId, customerId }) => {
    await validateCartItem({ gameId, customerId });
    await createCartItem({ gameId, customerId });
}

export const validateAndDeleteCartItems = async (customerId) => {
    await validateCartItem({ customerId });
    return await deleteCartItemsByField('customerId', customerId);
};

export const validateAndDeleteCartItem = async ({ gameId, customerId }) => {
    await validateCartItem({ gameId, customerId });
    return await deleteCartItemsByFields(
        ['gameId', 'customerId'],
        [gameId, customerId]
    );
};
