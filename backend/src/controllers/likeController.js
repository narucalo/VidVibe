// VidVibe//backend//src/controllers/likeController.js
const Like = require('../models/Like');

// Like a Video
const likeVideo = async (req, res) => {
    console.log('Liking video...');
    try {
        const { videoId } = req.body;
        const existingLike = await Like.findOne({ user: req.user.id, video: videoId });

        if (existingLike) {
            console.log('User already liked this video');
            return res.status(400).json({ message: 'You have already liked this video' });
        }

        const like = new Like({
            user: req.user.id,
            video: videoId
        });
        await like.save();
        console.log('Video liked successfully:', like._id);
        res.status(201).json(like);
    } catch (error) {
        console.error('Error liking video:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get Likes for a Video
const getLikes = async (req, res) => {
    console.log('Fetching likes for video:', req.params.videoId);
    try {
        const likes = await Like.find({ video: req.params.videoId }).populate('user', 'username');
        res.json(likes);
    } catch (error) {
        console.error('Error fetching likes:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { likeVideo, getLikes };
