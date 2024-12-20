import { GraphQLObjectType } from 'graphql';
import developerQuery from '../queries/developerQuery.js';
import developersQuery from '../queries/developersQuery.js';
import customerQuery from '../queries/customerQuery.js';
import customersQuery from '../queries/customersQuery.js';

const queryType = new GraphQLObjectType({
    name: 'Query',
    fields: {
        developer: developerQuery,
        developers: developersQuery,
        customer: customerQuery,
        customers: customersQuery,
    },
});

export default queryType;
