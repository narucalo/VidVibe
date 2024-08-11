// backend/src/routes/userRoutes.js

const express = require('express');
const router = express.Router();

// Assuming you have a User model and a controller method to handle registration
const User = require('../models/User'); // Adjust the path as needed

// Mock controller for example purposes
router.post('/register', async (req, res) => {
    const { username, password } = req.body;

    // Basic validation (expand as needed)
    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
    }

    // Create a new user
    const newUser = new User({ username, password });
    await newUser.save();

    // Return a success response
    return res.status(201).json({ token: 'dummy-token', user: newUser });
});

module.exports = router;
