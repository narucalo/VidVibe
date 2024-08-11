// VidVibe//backend//src/controllers/searchController.js
const Video = require('../models/Video');

// Search Videos
const searchVideos = async (req, res) => {
    console.log('Searching videos...');
    try {
        const { query } = req.query;
        const videos = await Video.find({
            $or: [
                { title: { $regex: query, $options: 'i' } },
                { description: { $regex: query, $options: 'i' } }
            ]
        });
        console.log('Search results found:', videos.length);
        res.json(videos);
    } catch (error) {
        console.error('Error searching videos:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { searchVideos };
