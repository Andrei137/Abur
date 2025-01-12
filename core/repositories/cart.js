import requestService from '@services/request.js';
import { handleValidation } from '@services/validation.js';
import { addItemToLibrary } from '@repositories/library.js';
import { findDLCsInCartByCustomerId } from '@repositories/dlcs.js';
import { findGamesInCartByCustomerId, findGamesInLibraryByCustomerId } from '@repositories/games.js';

const {
    findGameById,
    createCartItem,
    findCartItemByFields,
    findCartItemsByFields,
    deleteCartItemsByFields,
    deleteCartItemsByField,
    findLibraryItemsByFields
} = requestService;

const sendError = async errMsg =>
    await handleValidation((_) => Promise.resolve(errMsg), {});

export const validateAndCreateCartItem = async ({ gameId, customerId }) => {
    // item NU exista in db
    if ((await findGameById(gameId)) === null) {
        await sendError('Select a valid item from the store');
    }

    // item NU este deja in cart
    if ((await findCartItemsByFields(['gameId', 'customerId'], [gameId, customerId])).length !== 0) {
        await sendError('This item is already in your cart');
    }

    // item NU este deja in library
    if ((await findLibraryItemsByFields(['gameId', 'customerId'], [gameId, customerId])).length !== 0) {
        await sendError('This item is already in your library');
    }

    return await createCartItem({ gameId, customerId });
}

export const deleteCartItems = async customerId => {
    return await deleteCartItemsByField('customerId', customerId);
};

export const validateAndDeleteCartItem = async ({ gameId, customerId }) => {
    // item NU exista in cart
    if ((await findCartItemByFields(['gameId', 'customerId'], [gameId, customerId])) === null) {
        await sendError('This item is not in your cart');
    }

    return await deleteCartItemsByFields(['gameId', 'customerId'], [gameId, customerId]);
};

export const validateAndCheckoutCart = async (customerId) => {
    const [cartGames, cartDLCs, libraryGames ] = await Promise.all([
        findGamesInCartByCustomerId(customerId),
        findDLCsInCartByCustomerId(customerId),
        findGamesInLibraryByCustomerId(customerId)
    ]);

    // nu are niciun item in cart
    if ((cartGames.length + cartDLCs.length) === 0) {
        await sendError('Cannot proceed to checkout without any items in your cart');
    }

    // are jocul de baza in library sau cart pentru dlc-urile pe care vrea sa le cumpere
    let missingGames = [];
    for (const cartDLC of cartDLCs) {
        if (
            cartGames.some(game => game.id === cartDLC.baseGameId) ||
            libraryGames.some(game => game.id === cartDLC.baseGameId)
        ) continue;

        missingGames.push(
            `'${cartDLC.name}' requires the base game '${(await findGameById(cartDLC.baseGameId)).name}'`
        );
    }

    if (missingGames.length !== 0) {
        await sendError('The base game must be present in your library or cart to purchase the selected DLC(s): ' + missingGames.join(', '));
    }

    // add new items to library
    await Promise.all(
        cartGames.map(item => addItemToLibrary({ gameId: item.id, customerId })),
        cartDLCs.map(item => addItemToLibrary({ gameId: item.id, customerId }))
    );

    // delete all items from cart
    return await deleteCartItems(customerId);
};

