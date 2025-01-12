import { GraphQLBoolean, GraphQLString } from 'graphql';
import storeType from '@types/entity/store.js';

const storeQueryResolver = async (
    _,
    { sortOption = 'default', order = 'ascending', seeOwned = false },
    { userId }
) => ({ sortOption, order, userId, seeOwned });

export default {
    type: storeType,
    args: {
        sortOption: { type: GraphQLString },
        order     : { type: GraphQLString },
        seeOwned  : { type: GraphQLBoolean },
    },
    resolve: storeQueryResolver,
};
