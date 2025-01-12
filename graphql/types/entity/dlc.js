import {
    GraphQLInt,
    GraphQLFloat,
    GraphQLString,
    GraphQLNonNull,
    GraphQLObjectType,
} from 'graphql';
import GraphQLDate from 'graphql-date';
import gameType from './game.js';
import developerType from './developer.js';
import requestService from '@services/request.js';

const {
    findGameById,
    findDeveloperById,
} = requestService;

export default new GraphQLObjectType({
    name: 'DLC',
    fields: () => ({
        id          : { type: new GraphQLNonNull(GraphQLInt) },
        name        : { type: new GraphQLNonNull(GraphQLString) },
        initialPrice: {
            type: new GraphQLNonNull(GraphQLFloat),
            resolve: async game => game.price,
        },
        price       : {
            type: new GraphQLNonNull(GraphQLFloat),
            resolve: async game => game.price - (game.price * (game.discountPercentage / 100)),
        },
        discount    : {
            type: new GraphQLNonNull(GraphQLString),
            resolve: game => `${game.discountPercentage}%`,
        },
        releaseDate : { type: GraphQLDate },
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
        }
    }),
});
