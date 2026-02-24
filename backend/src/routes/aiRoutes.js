import express from 'express';
const router = express.Router();

// Dummy route
router.get('/', (req, res) => {
    res.json({ message: 'AI route working!' });
});

export default router;
