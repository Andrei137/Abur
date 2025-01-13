import {
    GraphQLBoolean,
    GraphQLString
} from 'graphql';
import storeType from '@types/entity/store.js';
import requestService from '@services/request.js';

const { findDeveloperById } = requestService;

const storeQueryResolver = async (_, { sortOption, order, hideOwned }, { userId }) => {
    if (sortOption === undefined || sortOption === 'purchaseDate') sortOption = 'default';
    if (hideOwned === undefined) hideOwned = true;
    if (userId === undefined || (await findDeveloperById(userId)) !== null) hideOwned = true;

    return { sortOption, order, userId, hideOwned };
};

export default {
    type: storeType,
    args: {
        sortOption: { type: GraphQLString },
        order     : { type: GraphQLString },
        hideOwned : { type: GraphQLBoolean },
    },
    resolve: storeQueryResolver,
};
