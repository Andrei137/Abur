import { GraphQLSchema } from 'graphql';
import query from './rootTypes/queryType.js';
import mutation from './rootTypes/mutationType.js';
import { createHandler } from 'graphql-http/lib/use/express';

export default createHandler({
    schema : new GraphQLSchema({ query, mutation }),
    context: req => ({ userId: req.raw.userId }),
});
