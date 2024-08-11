// VidVibe//backend//src/routes/searchRoutes.js
const express = require('express');
const { searchVideos } = require('../controllers/searchController');
const router = express.Router();

// Search videos by title or description
router.get('/', searchVideos);

module.exports = router;
