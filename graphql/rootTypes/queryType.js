import { GraphQLObjectType } from 'graphql';
import helloQuery from '../queries/helloQuery.js';
import developerQuery from '../queries/developerQuery.js';

const queryType = new GraphQLObjectType({
  name: "Query",
  fields: {
    hello: helloQuery,
    developer: developerQuery,
  },
});

export default queryType;
