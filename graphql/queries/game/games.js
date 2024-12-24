import { GraphQLList } from 'graphql';
import gameType from '@types/entity/game.js';
import { findAllValidGames } from '@repositories/games.js';

const gamesQueryResolver = async () => await findAllValidGames();

export default {
    type: new GraphQLList(gameType),
    resolve: gamesQueryResolver,
};
