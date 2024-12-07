import { GraphQLString } from 'graphql';

const helloQueryResolver = (_, { name }) => `Hello, ${name || 'World'}!`;

const helloQuery = {
  type: GraphQLString,
  args: {
    name: { type: GraphQLString }
  },
  resolve: helloQueryResolver
};

export default helloQuery;
