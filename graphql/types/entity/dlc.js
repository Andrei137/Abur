import {
    GraphQLInt,
    GraphQLList,
    GraphQLFloat,
    GraphQLString,
    GraphQLNonNull,
    GraphQLObjectType,
} from 'graphql';
import gameType from './game.js';
import reviewType from './review.js';
import developerType from './developer.js';
import {
    findGameSales,
    findActualPrice,
    findGameWishlists,
    findGamePopularity,
    findGameAverageRating,
    findPurchaseDateByCustomer,
} from '@repositories/games.js';
import requestService from '@services/request.js';
import { extractDate } from '@services/utils.js';

const {
    getActualPrice,
    findGameById,
    findDeveloperById,
    findReviewsByField,
} = requestService;

export default new GraphQLObjectType({
    name: 'DLC',
    fields: () => ({
        id          : { type: new GraphQLNonNull(GraphQLInt) },
        name        : { type: new GraphQLNonNull(GraphQLString) },
        releaseDate: {
            type: GraphQLString,
            resolve: (game) => extractDate(game.releaseDate),
        },
        purchaseDate: {
            type: GraphQLString,
            resolve: async dlc =>
                dlc.userId === undefined
                    ? null
                    : extractDate(await findPurchaseDateByCustomer(dlc)),
        },
        initialPrice: {
            type: new GraphQLNonNull(GraphQLFloat),
            resolve: dlc => dlc.price,
        },
        price: {
            type: new GraphQLNonNull(GraphQLFloat),
            resolve: dlc => findActualPrice(dlc),
        },
        discount: {
            type: new GraphQLNonNull(GraphQLString),
            resolve: dlc => dlc.discountPercentage
                ? `${dlc.discountPercentage}%`
                : '0%',
        },
        sales: {
            type: new GraphQLNonNull(GraphQLInt),
            resolve: async dlc => await findGameSales(dlc.id),
        },
        wishlists: {
            type: new GraphQLNonNull(GraphQLInt),
            resolve: async dlc => await findGameWishlists(dlc.id),
        },
        popularity: {
            type: new GraphQLNonNull(GraphQLInt),
            resolve: async dlc => await findGamePopularity(dlc.id),
        },
        averageRating: {
            type: GraphQLFloat,
            resolve: async dlc => await findGameAverageRating(dlc.id),
        },
        developer   : {
            type    : developerType,
            resolve: async dlc =>
                await findDeveloperById(dlc.developerId, {
                    joinWith: 'User'
                }),
        },
        baseGame    : {
            type: gameType,
            resolve: async dlc => await findGameById(dlc.baseGameId),
        },
        reviews: {
            type: new GraphQLList(reviewType),
            resolve: async dlc => await findReviewsByField('gameId', dlc.id),
        },
    }),
});
