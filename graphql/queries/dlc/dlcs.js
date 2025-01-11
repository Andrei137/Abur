import { GraphQLList } from 'graphql';
import requestService from '@services/request.js';
import dlcType from '@types/entity/dlc.js';

const { findAllDLCs } = requestService;

const dlcsQueryResolver = async () =>
    await findAllDLCs({
        joinWith: 'Game',
    });

export default {
    type: new GraphQLList(dlcType),
    resolve: dlcsQueryResolver,
};
