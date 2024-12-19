import 'dotenv/config';

const PORT = process.env.PORT || "3000";
const SECRET = process.env.SECRET;
const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS);
const NODE_ENV = process.env.NODE_ENV;

export default {
    PORT,
    SECRET,
    SALT_ROUNDS,
    NODE_ENV
};
