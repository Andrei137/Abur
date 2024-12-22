import { GraphQLList } from 'graphql';
import requestService from '@services/request.js';
import developerType from '@types/entity/developer.js';

const { findAllDevelopers } = requestService;

const developersQueryResolver = async () => await findAllDevelopers({ joinWith: 'User' });

const developersQuery = {
    type: new GraphQLList(developerType),
    resolve: developersQueryResolver,
};

export default developersQuery;
