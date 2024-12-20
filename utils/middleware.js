import { verifyToken } from '../core/services/authenticationService.js';

const unknownEndpoint = (_, res) => {
    res.status(404).json({ error: 'unknown endpoint' });
};

const errorHandler = (error, _, res, next) => {
    if (error.name === 'ValidationError') {
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

const userExtractor = async (req, _, next) => {
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (token) {
        req.user_id = verifyToken(token).user_id;
    }
    next();
};

export default {
    unknownEndpoint,
    errorHandler,
    userExtractor
};
