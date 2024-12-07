import { GraphQLSchema } from 'graphql';
import queryType from './rootTypes/queryType.js';
import { createHandler } from 'graphql-http/lib/use/express';

const schema = new GraphQLSchema({
  query: queryType
});

const graphqlController = createHandler({
  schema,
  context: req => ({ user_id: req.raw.user_id })
});

export default graphqlController;
