import requestService from '@services/request.js';
import { handleValidation } from '@services/validation.js';

const {
    createLibraryItem
} = requestService;

const validator = async validationData => {
    const {
        gameId = null,
        customerId = null
    } = validationData;

    console.log(validationData);
    console.log(gameId);
    console.log(customerId);

    // TODO: validate CREATE
    // item trebuie sa existe in db
    // item NU este deja in library

    return null;
};

const validateLibraryItem = async validationData =>
    await handleValidation(validator, validationData);

export const addItemToLibrary = async ({ gameId, customerId }) => {
    await createLibraryItem({
        gameId,
        customerId,
        purchaseDate: Date(),
    });
}
