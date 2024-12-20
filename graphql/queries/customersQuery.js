import { GraphQLList } from 'graphql';
import customerType from '../types/customerType.js';
import requestService from '../../core/services/requestService.js';

const { findAllCustomers } = requestService;

const customersQueryResolver = async () => await findAllCustomers({ joinWith: 'User' });

const customersQuery = {
    type: new GraphQLList(customerType),
    resolve: customersQueryResolver,
};

export default customersQuery;
