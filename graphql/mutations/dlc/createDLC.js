import { GraphQLString } from 'graphql';
import dlcType from '@types/entity/dlc.js';
import dlcInputType from '@types/input/dlc.js';
import { validateAndCreateDLC } from '@repositories/dlcs.js';

const createDLCMutationResolver = async (_, { dlc, forGame }, { userId }) =>
    await validateAndCreateDLC({ dlc, forGame, userId });

export default {
    type: dlcType,
    args: {
        dlc    : { type: dlcInputType },
        forGame: { type: GraphQLString },
    },
    resolve: createDLCMutationResolver,
};
