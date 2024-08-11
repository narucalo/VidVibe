// VidVibe//backend//src/config/dbConfig.js
const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection failed:', error);

        // Handle process exit differently in test environment
        if (process.env.NODE_ENV === 'test') {
            throw new Error('MongoDB connection failed in test environment');
        } else {
            process.exit(1);
        }
    }
};

module.exports = { connectDB };
