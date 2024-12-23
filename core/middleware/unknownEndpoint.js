export default (_, res) => {
    res.status(404).json({ error: 'unknown endpoint' });
};