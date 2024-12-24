import dlcType from '@types/entity/dlc.js';
import dlcInputType from '@types/input/dlc.js';
import requestService from '@services/request.js';
import { GraphQLString } from 'graphql';

const { createGame, createDLC, findGameByField } = requestService;

const createDLCMutationResolver = async (_, { dlc, forGame }, { userId }) => {
    if (!userId) return false;

    const baseGame = await findGameByField('name', forGame);
    if (!baseGame) return false;

    const createdDLC = await createGame({
        ...dlc,
        developerId: baseGame.developerId,
        type: 'dlc',
    });
    if (!createdDLC) return false;

    await createDLC({
        id: createdDLC.id,
        baseGameId: baseGame.id,
    });

    return createdDLC;
}

export default {
    type: dlcType,
    args: {
        dlc    : { type: dlcInputType },
        forGame: { type: GraphQLString },
    },
    resolve: createDLCMutationResolver,
};
