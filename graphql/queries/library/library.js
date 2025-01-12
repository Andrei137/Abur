import { GraphQLString } from 'graphql';
import libraryType from '@types/entity/library.js';

const libraryQueryResolver = async (_, { sortOption = 'name', order = 'ascending' }, { userId }) =>
    ({ sortOption, order, userId });

export default {
    type: libraryType,
    args: {
        sortOption: { type: GraphQLString },
        order     : { type: GraphQLString },
    },
    resolve: libraryQueryResolver,
};
