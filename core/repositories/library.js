import requestService from '@services/request.js';

const {
    createLibraryItem
} = requestService;

export const addItemToLibrary = async ({ gameId, customerId }) => {
    await createLibraryItem({
        gameId,
        customerId,
        purchaseDate: Date(),
    });
}
