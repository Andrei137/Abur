import { GraphQLSchema } from 'graphql';
import queryType from './rootTypes/queryType.js';
import { createHandler } from 'graphql-http/lib/use/express';
import mutationType from './rootTypes/mutationType.js';

const schema = new GraphQLSchema({
    query: queryType,
    mutation: mutationType,
});

const graphqlController = createHandler({
    schema,
    context: req => ({ user_id: req.raw.user_id })
});

export default graphqlController;
