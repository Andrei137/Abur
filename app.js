import express from 'express';
import 'express-async-errors';
import middleware from './utils/middleware.js';

const app = express();
app.use(express.json());
app.use(middleware.requestLogger);
app.use(middleware.userExtractor);
app.get('/', (req, res) => {
  res.send('Hello World!');
});
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

export default app;
