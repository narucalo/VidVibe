// VidVibe//backend//src/controllers/userController.js
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register User
const registerUser = async (req, res) => {
    console.log('Registering user...');
    try {
        const { username, password } = req.body;

        // Check if user already exists
        let user = await User.findOne({ username });
        if (user) {
            console.log('User already exists:', username);
            return res.status(400).json({ message: 'User already exists' });
        }

        user = new User({ username, password });

        // Debugging: Hashing the password
        console.log('Hashing the password for user:', username);
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        // Debugging: Saving the user
        console.log('Saving user to the database...');
        await user.save();
        console.log('User registered successfully:', username);

        // Debugging: Creating JWT token
        console.log('Creating JWT token...');
        const payload = { user: { id: user.id } };
        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
            if (err) throw err;
            console.log('JWT token created successfully');
            res.status(201).json({ token });
        });

    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Login User
const loginUser = async (req, res) => {
    console.log('Logging in user...');
    try {
        const { username, password } = req.body;

        // Check if the user exists
        const user = await User.findOne({ username });
        if (!user) {
            console.log('User not found:', username);
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            console.log('Invalid password for user:', username);
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Debugging: Creating JWT token
        console.log('Creating JWT token...');
        const payload = { user: { id: user.id } };
        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
            if (err) throw err;
            console.log('JWT token created successfully');
            res.status(200).json({ token });
        });
    } catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get User Profile
const getUserProfile = async (req, res) => {
    console.log('Fetching user profile...');
    try {
        const user = await User.findById(req.user.id).select('-password');
        if (!user) {
            console.log('User not found:', req.user.id);
            return res.status(404).json({ message: 'User not found' });
        }
        console.log('User profile retrieved:', user.username);
        res.json(user);
    } catch (error) {
        console.error('Error fetching user profile:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { registerUser, loginUser, getUserProfile };
