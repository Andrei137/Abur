import { GraphQLList } from 'graphql';
import requestService from '@services/request.js';
import customerType from '@types/entity/customer.js';

const { findAllCustomers } = requestService;

const customersQueryResolver = async () =>
    await findAllCustomers({
        joinWith: 'User'
    });

export default {
    type   : new GraphQLList(customerType),
    resolve: customersQueryResolver,
};

