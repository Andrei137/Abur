import { GraphQLObjectType } from 'graphql';
import helloQuery from '../queries/helloQuery.js';
import developerQuery from '../queries/developerQuery.js';
import customerQuery from '../queries/customerQuery.js';

const queryType = new GraphQLObjectType({
  name: "Query",
  fields: {
    hello: helloQuery,
    developer: developerQuery,
    customer: customerQuery,
  },
});

export default queryType;
