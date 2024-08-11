const express = require('express');
const { likeVideo, getLikes } = require('../controllers/likeController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

// Like a video
router.post('/', authMiddleware, likeVideo);

// Get likes for a video
router.get('/:videoId', getLikes);

module.exports = router;
