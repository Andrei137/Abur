import { verifyToken } from '@services/authentication.js';

export default async (req, _, next) => {
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (token) {
        req.user_id = verifyToken(token).user_id;
    }
    next();
};
