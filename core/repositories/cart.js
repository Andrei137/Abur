import requestService from '@services/request.js';
import { handleValidation } from '@services/validation.js';
import { validateAndCreateLibraryItem } from '@repositories/library.js';

const {
    findCartItemsByField,
    findCartItemByFields,
    createCartItem,
    deleteCartItemByFields,
    deleteCartItemsByField,
} = requestService;

const validator = async validationData => {
    const {
        gameId = null,
        customerId = null
    } = validationData;

    console.log(validationData);
    console.log(gameId);
    console.log(customerId);

    // TODO: validate DELETE
    // item NU exista in cart
    // if ((await findCartItemByFields(['gameId', 'customerId'], [gameId, customerId])) === null) return 'this item is not in your cart';    

    // TODO: validate CREATE
    // item trebuie sa existe in db
    // item NU este deja in library
    // item NU este deja in cart

    return null;
};

const validateCartItem = async validationData =>
    await handleValidation(validator, validationData);

export const validateAndCreateCartItem = async ({ gameId, customerId }) => {
    // TODO
    // validateCartItem();

    await createCartItem({
        gameId,
        customerId,
    });
}

export const deleteCartItems = async (customerId) => {
    return await deleteCartItemsByField('customerId', customerId);
};

export const validateAndDeleteCartItem = async ({ gameId, customerId }) => {
    // TODO
    // validateCartItem({ gameId, customerId });
    return await deleteCartItemByFields(['gameId', 'customerId'], [gameId, customerId]);
};

export const validateAndCheckoutCart = async (customerId) => {
    const cartItems = await findCartItemsByField('customerId', customerId);
    console.log(cartItems);
    
    if (cartItems.length === 0) {
        return 'cannot proceed to checkout without any items in your cart'
    }

    // 2. are jocul de baza in library sau cart pentru dlc-urile pe care vrea sa le cumpere 
    // TODO

    // add new items to library
    // await Promise.all(cartItems.map(item => validateAndCreateLibraryItem(item)));

    // delete all items from cart 
    // deleteCartItems(customerId);

    return true;
};
