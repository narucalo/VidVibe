// VidVibe//backend//src/routes/notificationRoutes.js
const express = require('express');
const { getNotifications, markAsRead } = require('../controllers/notificationController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

// Get notifications for a user
router.get('/', authMiddleware, getNotifications);

// Mark notification as read
router.put('/:id/read', authMiddleware, markAsRead);

module.exports = router;
