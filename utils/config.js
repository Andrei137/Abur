import 'dotenv/config';

const PORT = process.env.PORT || 3000;
const SECRET = process.env.SECRET;
const NODE_ENV = process.env.NODE_ENV;

export default {
    PORT,
    SECRET,
    NODE_ENV
};
