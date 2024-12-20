import { GraphQLList } from 'graphql';
import developerType from '../types/developerType.js';
import requestService from '../../core/services/requestService.js';

const developersQueryResolver = async () => {
    const data = await requestService.findAllDevelopers();
    return data;
};

const developersQuery = {
    type: new GraphQLList(developerType),
    resolve: developersQueryResolver,
};

export default developersQuery;
