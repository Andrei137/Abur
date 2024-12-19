import { GraphQLObjectType } from 'graphql';
import developerQuery from '../queries/developerQuery.js';
import customerQuery from '../queries/customerQuery.js';

const queryType = new GraphQLObjectType({
  name: 'Query',
  fields: {
    developer: developerQuery,
    customer: customerQuery,
  },
});

export default queryType;
