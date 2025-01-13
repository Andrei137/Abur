import { GraphQLUnionType } from 'graphql';
import dlcType from './dlc.js';
import gameType from './game.js';

export default new GraphQLUnionType({
    name       : 'GameOrDlc',
    types      : () => ([gameType, dlcType]),
    resolveType: ({ type }) => (type === 'dlc' ? 'DLC' : 'Game'),
});
