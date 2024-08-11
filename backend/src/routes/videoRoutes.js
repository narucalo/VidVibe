// VidVibe//backend//src/routes/videoRoutes.js
const express = require('express');
const { uploadVideo } = require('../controllers/videoController');
const upload = require('../middlewares/uploadMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/upload', authMiddleware, upload.single('video'), uploadVideo);

module.exports = router;
