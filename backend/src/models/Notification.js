// VidVibe//backend//src/models/Notification.js
const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, required: true }, // e.g., 'like', 'comment'
    data: { type: mongoose.Schema.Types.Mixed, required: true }, // Any relevant data, such as videoId or commentId
    read: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Notification', notificationSchema);
