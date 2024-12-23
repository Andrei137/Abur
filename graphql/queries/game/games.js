import { GraphQLList } from 'graphql';
import gameType from '@types/entity/game.js';
import requestService from '@services/request.js';

const { findAllGames } = requestService;

const gamesQueryResolver = async () => await findAllGames();

export default {
    type: new GraphQLList(gameType),
    resolve: gamesQueryResolver,
};
