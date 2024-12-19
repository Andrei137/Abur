import { GraphQLInt, GraphQLNonNull } from 'graphql';
import customerType from '../types/customerType.js';
import requestService from '../../core/services/requestService.js';

const { findUserById, findCustomerById } = requestService;

const customerQueryResolver = async (_, { id }) => {
    const [user, customer] = await Promise.all([
        findUserById(id),
        findCustomerById(id)
    ]);

    return user && customer
        ? { ...user.dataValues, ...customer.dataValues }
        : null;
};

const customerQuery = {
    type: customerType,
    args: {
        id: { type: new GraphQLNonNull(GraphQLInt) }
    },
    resolve: customerQueryResolver,
};

export default customerQuery;
