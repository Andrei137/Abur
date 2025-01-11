import { GraphQLInt } from 'graphql';
import dlcType from '@types/entity/dlc.js';
import dlcInputType from '@types/input/dlc.js';
import { validateAndUpdateDLC } from '@repositories/dlcs.js';

const updateDLCMutationResolver = async (_, { id, dlc }, { userId }) =>
    await validateAndUpdateDLC({ id, dlc, userId });

export default {
    type: dlcType,
    args: {
        id : { type: GraphQLInt },
        dlc: { type: dlcInputType },
    },
    resolve: updateDLCMutationResolver,
};
