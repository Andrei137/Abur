import requestService from '@services/request.js';
import { handleValidation } from '@services/validation.js';
import { addItemToLibrary } from '@repositories/library.js';
import { findGamesInCartByCustomerId, findGamesInLibraryByCustomerId } from '@repositories/games.js';
import { findDLCsInCartByCustomerId } from '@repositories/dlcs.js';

const {
    findCartItemByFields,
    findCartItemsByFields,
    createCartItem,
    deleteCartItemByFields,
    deleteCartItemsByField,

    findGameById,
    findLibraryItemsByFields
} = requestService;

export const validateAndCreateCartItem = async ({ gameId, customerId }) => {
    // 1. item trebuie sa existe in db
    if ((await findGameById(gameId)) === null) {
        await handleValidation((_) => Promise.resolve('select a valid item from the store'), {});
    }
    
    // 2. item NU este deja in cart
    if ((await findCartItemsByFields(['gameId', 'customerId'], [gameId, customerId])).length !== 0) {
        await handleValidation((_) => Promise.resolve('this item is already in your cart'), {});
    }
    
    // 3. item NU este deja in library
    if ((await findLibraryItemsByFields(['gameId', 'customerId'], [gameId, customerId])).length !== 0) {
        await handleValidation((_) => Promise.resolve('this item is already in your library'), {});
    }
    
    await createCartItem({
        gameId,
        customerId,
    });
}

export const deleteCartItems = async (customerId) => {
    return await deleteCartItemsByField('customerId', customerId);
};

export const validateAndDeleteCartItem = async ({ gameId, customerId }) => {
    // 1. item NU exista in cart
    if ((await findCartItemByFields(['gameId', 'customerId'], [gameId, customerId])) === null) {
        await handleValidation((_) => Promise.resolve('this item is not in your cart'), {});
    }

    return await deleteCartItemByFields(['gameId', 'customerId'], [gameId, customerId]);
};

export const validateAndCheckoutCart = async (customerId) => {    
    const [cartGames, cartDLCs, libraryGames ] = await Promise.all([
        findGamesInCartByCustomerId(customerId),
        findDLCsInCartByCustomerId(customerId),
        findGamesInLibraryByCustomerId(customerId)
    ]);

    // 1. nu are niciun item in cart
    if ((cartGames.length + cartDLCs.length) === 0) {
        await handleValidation((_) => Promise.resolve('cannot proceed to checkout without any items in your cart'), {});
    }
    
    // 2. are jocul de baza in library sau cart pentru dlc-urile pe care vrea sa le cumpere 
    let missingGames = []
    for (const cartDLC of cartDLCs) {    
        const found = cartGames.some(game => game.id === cartDLC.baseGameId) || libraryGames.some(game => game.id === cartDLC.baseGameId)
        if (!found) {
            missingGames.push(`'${cartDLC.name}' requires the base game '${(await findGameById(cartDLC.baseGameId)).name}'`);
        }
    }
    
    if (missingGames.length !== 0) {
        await handleValidation((_) => Promise.resolve('the base game must be present in your library or cart to purchase the selected DLC(s):   ' + missingGames.join("   ")), {});
    }

    // add new items to library
    await Promise.all(
        cartGames.map(item => addItemToLibrary({ gameId: item.id, customerId })),
        cartDLCs.map(item => addItemToLibrary({ gameId: item.id, customerId }))
    );

    // delete all items from cart 
    return await deleteCartItems(customerId);
};
