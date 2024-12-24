import dlcType from '@types/entity/dlc.js';
import requestService from '@services/request.js';
import { GraphQLInt, GraphQLNonNull } from 'graphql';

const { findDLCById } = requestService;

const dlcQueryResolver = async (_, { id }) =>
    await findDLCById(id, {
        joinWith: 'Game'
    });

export default {
    type: dlcType,
    args: {
        id: { type: new GraphQLNonNull(GraphQLInt) }
    },
    resolve: dlcQueryResolver,
};
