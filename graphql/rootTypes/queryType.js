import { GraphQLObjectType } from 'graphql';
import cartQueries from '@cart-queries';
import customerQueries from '@customer-queries';
import developerQueries from '@developer-queries';
import dlcQueries from '@dlc-queries';
import gameQueries from '@game-queries';
import libraryQueries from '@library-queries';
import reviewQueries from '@review-queries';
import storeQueries from '@store-queries';
import wishlistQueries from '@wishlist-queries';
import { authHandler } from './authHandler.js';

export default new GraphQLObjectType({
    name: 'Query',
    fields: {
        ...authHandler(cartQueries, 'customer'),
        ...customerQueries,
        ...developerQueries,
        ...dlcQueries,
        ...gameQueries,
        ...authHandler(libraryQueries, 'customer'),
        ...reviewQueries,
        ...storeQueries,
        ...authHandler(wishlistQueries, 'customer'),
    },
});
