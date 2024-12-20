import { GraphQLList } from 'graphql';
import developerType from '../types/developerType.js';
import requestService from '../../core/services/requestService.js';

const { findAllDevelopers } = requestService;

const developersQueryResolver = async () => await findAllDevelopers({ joinWith: 'User' });

const developersQuery = {
    type: new GraphQLList(developerType),
    resolve: developersQueryResolver,
};

export default developersQuery;
