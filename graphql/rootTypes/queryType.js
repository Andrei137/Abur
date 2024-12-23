import { GraphQLObjectType } from 'graphql';
import gameQueries from '@game-queries';
import customerQueries from '@customer-queries';
import developerQueries from '@developer-queries';

export default new GraphQLObjectType({
    name: 'Query',
    fields: {
        ...gameQueries,
        ...customerQueries,
        ...developerQueries,
    },
});
