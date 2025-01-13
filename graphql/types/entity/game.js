import {
    GraphQLInt,
    GraphQLList,
    GraphQLString,
    GraphQLNonNull,
    GraphQLObjectType,
} from 'graphql';
import dlcType from './dlc.js';
import requestService from '@services/request.js';
import { findDLCsInLibraryByCustomerId } from '@repositories/dlcs.js';
import { commonGameFields } from '@services/utils.js';

const { findDLCsByField } = requestService;

export default new GraphQLObjectType({
    name  : 'Game',
    fields: () => ({
        id  : { type: new GraphQLNonNull(GraphQLInt) },
        name: { type: new GraphQLNonNull(GraphQLString) },
        dlcs: {
            type   : new GraphQLList(dlcType),
            resolve: async ({ id, userId }) => userId === undefined
                ? await findDLCsByField('baseGameId', id, {
                    joinWith: 'Game',
                })
                : (await findDLCsInLibraryByCustomerId(userId)).filter(
                    dlc => dlc.baseGameId === id
                ),
        },
        ...commonGameFields(),
    }),
});
