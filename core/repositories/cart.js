import requestService from '@services/request.js';

const {
    deleteCartItemsByField
} = requestService;

export const deleteCartItems = async (userId) => {
    return await deleteCartItemsByField('customerId', userId);
};
