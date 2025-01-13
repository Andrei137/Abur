import {
    GraphQLInt,
    GraphQLList,
    GraphQLString,
    GraphQLNonNull,
    GraphQLObjectType,
} from 'graphql';
import reviewType from './review.js';
import libraryType from './library.js';
import wishlistType from './wishlist.js';
import customerStatsType from './customerStats.js';
import requestService from '@services/request.js';

const { findReviewsByField } = requestService;

export default new GraphQLObjectType({
    name  : 'Customer',
    fields: () => ({
        id       : { type: new GraphQLNonNull(GraphQLInt) },
        username : { type: new GraphQLNonNull(GraphQLString) },
        password : { type: new GraphQLNonNull(GraphQLString) },
        email    : { type: new GraphQLNonNull(GraphQLString) },
        firstName: { type: GraphQLString },
        lastName : { type: GraphQLString },
        reviews: {
            type   : new GraphQLList(reviewType),
            resolve: async ({ id }) =>
                await findReviewsByField('customerId', id),
        },
        library: {
            type   : libraryType,
            resolve: ({ id }) => ({ userId: id }),
        },
        wishlist: {
            type   : wishlistType,
            resolve: ({ id }) => ({ userId: id }),
        },
        stats: {
            type   : customerStatsType,
            resolve: ({ id }) => id,
        },
    }),
});
