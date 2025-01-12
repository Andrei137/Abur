import {
    GraphQLInt,
    GraphQLList,
    GraphQLFloat,
    GraphQLString,
    GraphQLNonNull,
    GraphQLObjectType,
} from 'graphql';
import dlcType from './dlc.js';
import reviewType from './review.js';
import developerType from './developer.js';
import { findDLCsInLibraryByCustomerId } from '@repositories/dlcs.js';
import {
    findGameSales,
    findActualPrice,
    findGameWishlists,
    findGamePopularity,
    findGameAverageRating,
    findPurchaseDateByCustomer,
} from '@repositories/games.js';
import { extractDate } from '@services/utils.js';
import requestService from '@services/request.js';

const { findDLCsByField, findDeveloperById, findReviewsByField } =
  requestService;

export default new GraphQLObjectType({
    name: 'Game',
    fields: () => ({
        id: { type: new GraphQLNonNull(GraphQLInt) },
        name: { type: new GraphQLNonNull(GraphQLString) },
        releaseDate: {
            type: GraphQLString,
            resolve: (game) => extractDate(game.releaseDate),
        },
        purchaseDate: {
            type: GraphQLString,
            resolve: async (game) =>
                game.userId === undefined
                    ? null
                    : extractDate(await findPurchaseDateByCustomer(game)),
        },
        initialPrice: {
            type: new GraphQLNonNull(GraphQLFloat),
            resolve: (game) => game.price,
        },
        price: {
            type: new GraphQLNonNull(GraphQLFloat),
            resolve: (game) => findActualPrice(game),
        },
        discount: {
            type: new GraphQLNonNull(GraphQLString),
            resolve: (game) => game.discountPercentage
                ? `${game.discountPercentage}%`
                : '0%',
        },
        sales: {
            type: new GraphQLNonNull(GraphQLInt),
            resolve: async (game) => await findGameSales(game.id),
        },
        wishlists: {
            type: new GraphQLNonNull(GraphQLInt),
            resolve: async (game) => await findGameWishlists(game.id),
        },
        averageRating: {
            type: GraphQLFloat,
            resolve: async (game) => await findGameAverageRating(game.id),
        },
        popularity: {
            type: new GraphQLNonNull(GraphQLInt),
            resolve: async (game) => await findGamePopularity(game.id),
        },
        developer: {
            type: developerType,
            resolve: async (game) =>
                await findDeveloperById(game.developerId, {
                    joinWith: 'User',
                }),
        },
        dlcs: {
            type: new GraphQLList(dlcType),
            resolve: async (game) =>
                game.userId === undefined
                    ? await findDLCsByField('baseGameId', game.id, {
                        joinWith: 'Game',
                    })
                    : (await findDLCsInLibraryByCustomerId(game.userId)).filter(
                        (dlc) => dlc.baseGameId === game.id
                    ),
        },
        reviews: {
            type: new GraphQLList(reviewType),
            resolve: async (game) => await findReviewsByField('gameId', game.id),
        },
    }),
});
