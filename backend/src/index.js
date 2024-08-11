// backend/src/index.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { connectDB } = require('./config/dbConfig');
const User = require('./models/User'); // Import the User model

// Initialize express app
console.log('Initializing Express app...');
const app = express();

// Set security headers
app.use(helmet());

// Apply rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Middleware
console.log('Setting up middleware...');
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
console.log('Connecting to MongoDB...');
connectDB()
    .then(() => console.log('MongoDB connection established'))
    .catch(err => console.error('MongoDB connection failed:', err));

// User registration route
app.post('/api/users/register', async (req, res) => {
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

// Start the server
const PORT = process.env.PORT || 5001;
const server = app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = server;
