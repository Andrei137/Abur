import { GraphQLObjectType } from 'graphql';
import helloQuery from '../queries/helloQuery.js';

const queryType = new GraphQLObjectType({
  name: "Query",
  fields: {
    hello: helloQuery
  },
});


export default queryType;
