import { GraphQLObjectType } from 'graphql';
import customerQuery from '@queries/customer/single.js';
import customersQuery from '@queries/customer/list.js';
import developerQuery from '@queries/developer/single.js';
import developersQuery from '@queries/developer/list.js';

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
