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
import requestService from '@services/request.js';

const { findReviewsByField } = requestService;

export default new GraphQLObjectType({
    name: 'Customer',
    fields: () => ({
        id       : { type: new GraphQLNonNull(GraphQLInt) },
        username : { type: new GraphQLNonNull(GraphQLString) },
        password : { type: new GraphQLNonNull(GraphQLString) },
        email    : { type: new GraphQLNonNull(GraphQLString) },
        firstName: { type: GraphQLString },
        lastName : { type: GraphQLString },
        reviews  : {
            type: new GraphQLList(reviewType),
            resolve: async customer =>
                await findReviewsByField('customerId', customer.id),
        },
        library  : {
            type: libraryType,
            resolve: customer => ({ userId: customer.id }),
        },
        wishlist : {
            type: wishlistType,
            resolve: customer => ({ userId: customer.id }),
        },
    }),
});
