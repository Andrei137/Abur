import { GraphQLInt } from 'graphql';
import dlcType from '@types/entity/dlc.js';
import dlcInputType from '@types/input/dlc.js';
import requestService from '@services/request.js';
import { validateGame } from '@repositories/games.js';

const { updateGame } = requestService;

const updateDLCMutationResolver = async (_, { id, dlc }, { userId }) => {
    await validateGame({
        id,
        userId,
        type: 'dlc',
        name: dlc.name,
    });
    return await updateGame(id, dlc);
};

export default {
    type: dlcType,
    args: {
        id : { type: GraphQLInt },
        dlc: { type: dlcInputType },
    },
    resolve: updateDLCMutationResolver,
};
