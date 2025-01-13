import {
    GraphQLInt,
    GraphQLList,
    GraphQLFloat,
    GraphQLString,
    GraphQLNonNull,
} from 'graphql';
import reviewType from '@types/entity/review.js';
import developerType from '@types/entity/developer.js';
import {
    findGameSales,
    findActualPrice,
    findGameWishlists,
    findGamePopularity,
    findGameAverageRating,
    findPurchaseDateByCustomer,
} from '@repositories/games.js';
import requestService from '@services/request.js';

const {
    findReviewsByField,
    findDeveloperById
} = requestService;

export const extractDate = date => date.toISOString().split('T')[0];

export const commonGameFields = () => ({
    releaseDate: {
        type   : GraphQLString,
        resolve: ({ releaseDate }) => extractDate(releaseDate),
    },
    purchaseDate: {
        type   : GraphQLString,
        resolve: async entity => entity.userId === undefined
            ? null
            : extractDate(await findPurchaseDateByCustomer(entity)),
    },
    initialPrice: {
        type   : new GraphQLNonNull(GraphQLFloat),
        resolve: entity => entity.price,
    },
    price: {
        type   : new GraphQLNonNull(GraphQLFloat),
        resolve: entity => findActualPrice(entity),
    },
    discount: {
        type   : new GraphQLNonNull(GraphQLString),
        resolve: ({ discountPercentage }) =>
            discountPercentage ? `${discountPercentage}%` : '0%',
    },
    sales: {
        type   : new GraphQLNonNull(GraphQLInt),
        resolve: async ({ id }) => await findGameSales(id),
    },
    wishlists: {
        type   : new GraphQLNonNull(GraphQLInt),
        resolve: async ({ id }) => await findGameWishlists(id),
    },
    popularity: {
        type   : new GraphQLNonNull(GraphQLInt),
        resolve: async ({ id }) => await findGamePopularity(id),
    },
    averageRating: {
        type   : GraphQLFloat,
        resolve: async ({ id }) => await findGameAverageRating(id),
    },
    reviews: {
        type   : new GraphQLList(reviewType),
        resolve: async ({ id }) => await findReviewsByField('gameId', id),
    },
    developer: {
        type   : developerType,
        resolve: async ({ developerId }) =>
            await findDeveloperById(developerId, { joinWith: 'User' }),
    },
});
