import gameType from './game.js';
import dlcType from './dlc.js';
import { GraphQLUnionType } from "graphql";

export default new GraphQLUnionType({
    name: 'GameOrDlc',
    types: () => ([gameType, dlcType]),
    resolveType: value => (value.type === 'dlc' ? 'DLC' : 'Game'),
});
