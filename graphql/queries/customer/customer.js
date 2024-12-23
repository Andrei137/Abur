import requestService from '@services/request.js';
import customerType from '@types/entity/customer.js';
import { GraphQLInt, GraphQLNonNull } from 'graphql';

const { findCustomerById } = requestService;

const customerQueryResolver = async (_, { id }) =>
    await findCustomerById(id, {
        joinWith: 'User'
    });

export default {
    type: customerType,
    args: {
        id: { type: new GraphQLNonNull(GraphQLInt) }
    },
    resolve: customerQueryResolver,
};
