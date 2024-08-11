// VidVibe//backend//src/controllers/notificationController.js
const Notification = require('../models/Notification');

// Get Notifications for a User
const getNotifications = async (req, res) => {
    console.log('Fetching notifications for user:', req.user.id);
    try {
        const notifications = await Notification.find({ user: req.user.id }).sort({ createdAt: -1 });
        res.json(notifications);
    } catch (error) {
        console.error('Error fetching notifications:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Mark Notification as Read
const markAsRead = async (req, res) => {
    console.log('Marking notification as read:', req.params.id);
    try {
        const notification = await Notification.findById(req.params.id);
        if (!notification) {
            return res.status(404).json({ message: 'Notification not found' });
        }

        notification.read = true;
        await notification.save();
        res.json({ message: 'Notification marked as read' });
    } catch (error) {
        console.error('Error marking notification as read:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { getNotifications, markAsRead };
