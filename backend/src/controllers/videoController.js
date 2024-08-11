// VidVibe//backend//src/controllers/videoController.js
const Video = require('../models/Video');

// Upload Video
const uploadVideo = async (req, res) => {
    console.log('Uploading video...');
    try {
        const { title, description } = req.body;

        // Debugging: Creating new video instance
        console.log('Creating new video instance...');
        const video = new Video({
            user: req.user.id,
            title,
            description,
            filePath: req.file.path
        });

        // Debugging: Saving the video
        console.log('Saving video to the database...');
        await video.save();
        console.log('Video uploaded successfully:', title);
        res.status(201).json(video);
    } catch (error) {
        console.error('Error uploading video:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { uploadVideo };
