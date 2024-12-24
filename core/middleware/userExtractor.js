import { verifyToken } from '@services/authentication.js';

export default async (req, _, next) => {
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (token) {
        req.userId = verifyToken(token).userId;
    }
    next();
};
