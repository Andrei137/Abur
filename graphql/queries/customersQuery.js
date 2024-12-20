import { GraphQLList } from 'graphql';
import customerType from '../types/customerType.js';
import requestService from '../../core/services/requestService.js';

const customersQueryResolver = async () => {
    const data = await requestService.findAllCustomers();
    return data;
};

const customersQuery = {
    type: new GraphQLList(customerType),
    resolve: customersQueryResolver,
};

export default customersQuery;
