import { GraphQLList } from 'graphql';
import { filterGames } from '@repositories/games.js';
import gameType from '@types/entity/game.js';

const gamesQueryResolver = async () => await filterGames();

export default {
    type   : new GraphQLList(gameType),
    resolve: gamesQueryResolver,
};
