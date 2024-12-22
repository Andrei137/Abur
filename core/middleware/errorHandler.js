export default (error, _, res, next) => {
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