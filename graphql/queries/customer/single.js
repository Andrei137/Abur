import requestService from '@services/request.js';
import customerType from '@types/entity/customer.js';
import { GraphQLInt, GraphQLNonNull } from 'graphql';

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
