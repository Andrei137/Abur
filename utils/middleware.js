import morgan from 'morgan';
import jwt from 'jsonwebtoken';
import logger from './logger.js';
import config from './config.js';

const requestLogger = config.NODE_ENV !== 'test'
  ? morgan(':method :url :status - :response-time ms')
  : (req, res, next) => next();

const unknownEndpoint = (req, res) => {
  res.status(404).json({ error: 'unknown endpoint' });
};

const errorHandler = (error, req, res, next) => {
  logger.error(error.message);

  if (error.name === 'CastError') {
    return res.status(400).json({ error: 'Malformatted id' });
  }
  else if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message })
  }
  else if (error.name ===  'JsonWebTokenError') {
    return res.status(401).json({ error: 'Invalid token' });
  }
  else if (error.name === 'TokenExpiredError') {
    return res.status(401).json({ error: 'Expired token' });
  }

  next(error);
};

const userExtractor = async (req, res, next) => {
  const token = req.headers.authorization?.replace('Bearer ', '');
  if (!token) {
    next();
    return;
  }

  const decodedToken = jwt.verify(token, config.SECRET);
  req.user_id = decodedToken.id;

  next();
};

export default {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  userExtractor
};
