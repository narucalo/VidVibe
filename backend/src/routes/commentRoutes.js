const express = require('express');
const { addComment, getComments } = require('../controllers/commentController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

// Add a comment
router.post('/', authMiddleware, addComment);

// Get comments for a video
router.get('/:videoId', getComments);

module.exports = router;
