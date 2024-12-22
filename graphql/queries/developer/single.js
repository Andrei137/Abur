import requestService from '@services/request.js';
import { GraphQLInt, GraphQLNonNull } from 'graphql';
import developerType from '@types/entity/developer.js';

const { findUserById, findDeveloperById } = requestService;

const developerQueryResolver = async (_, { id }) => {
    const [user, developer] = await Promise.all([
        findUserById(id),
        findDeveloperById(id)
    ]);

    return user && developer
        ? { ...user.dataValues, ...developer.dataValues }
        : null;
};

const developerQuery = {
    type: developerType,
    args: {
        id: { type: new GraphQLNonNull(GraphQLInt) }
    },
    resolve: developerQueryResolver,
};

export default developerQuery;
