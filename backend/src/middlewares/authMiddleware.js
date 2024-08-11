// VidVibe//backend//src/middlewares/authMiddleware.js
const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    console.log('Authenticating request...');
    const token = req.header('Authorization');
    if (!token) {
        console.log('No token, authorization denied');
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
        console.log('Verifying token...');
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.user;
        console.log('Token verified, user authenticated:', req.user.id);
        next();
    } catch (error) {
        console.error('Token is not valid:', error);
        res.status(401).json({ message: 'Token is not valid' });
    }
};

module.exports = authMiddleware;
