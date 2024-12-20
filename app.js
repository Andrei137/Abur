import express from 'express';
import 'express-async-errors';
import middleware from './utils/middleware.js';
import graphqlController from './graphql/controller.js';

const app = express();
app.use(express.json());
app.get('/health', (_, res) => res.send('Server is running'));
app.all('/graphql', middleware.userExtractor, graphqlController);
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

export default app;
