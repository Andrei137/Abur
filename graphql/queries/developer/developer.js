import requestService from '@services/request.js';
import { GraphQLInt, GraphQLNonNull } from 'graphql';
import developerType from '@types/entity/developer.js';

const { findDeveloperById } = requestService;

const developerQueryResolver = async (_, { id }) =>
    await findDeveloperById(id, {
        joinWith: 'User'
    });

export default {
    type: developerType,
    args: {
        id: { type: new GraphQLNonNull(GraphQLInt) }
    },
    resolve: developerQueryResolver,
};

