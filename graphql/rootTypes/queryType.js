import { GraphQLObjectType } from 'graphql';
import dlcQueries from '@dlc-queries';
import gameQueries from '@game-queries';
import customerQueries from '@customer-queries';
import developerQueries from '@developer-queries';
import reviewQueries from '@review-queries';

export default new GraphQLObjectType({
    name: 'Query',
    fields: {
        ...dlcQueries,
        ...gameQueries,
        ...customerQueries,
        ...developerQueries,
        ...reviewQueries,
    },
});
