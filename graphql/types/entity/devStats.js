import { GraphQLObjectType } from 'graphql';
import dlcType from './dlc.js';
import gameType from './game.js';
import {
    getBestRatedDLC,
    getBestSelledDLC,
    getMostPopularDLC,
    getBestRatedGame,
    getBestSelledGame,
    getMostPopularGame,
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
  }),
});
