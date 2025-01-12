import { GraphQLObjectType } from 'graphql';
import dlcType from './dlc.js';
import gameType from './game.js';
import {
    getBestRatedDLC,
    getBestSelledDLC,
    getMostPopularDLC,
    getMostWishlistedDLC,
    getBestRatedGame,
    getBestSelledGame,
    getMostPopularGame,
    getMostWishlistedGame,
} from '@repositories/developers.js';

export default new GraphQLObjectType({
  name: 'DevStats',
  fields: () => ({
    bestRatedGame: {
      type: gameType,
      resolve: async id => await getBestRatedGame(id),
    },
    bestSelledGame: {
      type: gameType,
      resolve: async id => await getBestSelledGame(id),
    },
    mostPopularGame: {
      type: gameType,
      resolve: async id => await getMostPopularGame(id),
    },
    mostWishlistedGame: {
      type: gameType,
      resolve: async id => await getMostWishlistedGame(id),
    },
    bestRatedDLC: {
      type: dlcType,
      resolve: async id => await getBestRatedDLC(id),
    },
    bestSelledDLC: {
      type: dlcType,
      resolve: async id => await getBestSelledDLC(id),
    },
    mostPopularDLC: {
      type: dlcType,
      resolve: async id => await getMostPopularDLC(id),
    },
    mostWishlistedDLC: {
      type: dlcType,
      resolve: async id => await getMostWishlistedDLC(id),
    },
  }),
});
