const Comment = require('../models/Comment');

// Add Comment
const addComment = async (req, res) => {
    console.log('Adding comment...');
    try {
        const { videoId, text } = req.body;
        const comment = new Comment({
            user: req.user.id,
            video: videoId,
            text
        });
        await comment.save();
        console.log('Comment added successfully:', comment._id);
        res.status(201).json(comment);
    } catch (error) {
        console.error('Error adding comment:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get Comments for a Video
const getComments = async (req, res) => {
    console.log('Fetching comments for video:', req.params.videoId);
    try {
        const comments = await Comment.find({ video: req.params.videoId }).populate('user', 'username');
        res.json(comments);
    } catch (error) {
        console.error('Error fetching comments:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { addComment, getComments };
