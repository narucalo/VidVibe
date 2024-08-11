// VidVibe//backend//src/utils/cache.js
const redis = require('redis');
const client = redis.createClient();

client.on('error', (err) => {
    console.error('Redis error:', err);
});

// Middleware to check cache
const checkCache = (req, res, next) => {
    const { key } = req.query;

    client.get(key, (err, data) => {
        if (err) throw err;

        if (data !== null) {
            res.send(JSON.parse(data));
        } else {
            next();
        }
    });
};

// Set data to cache
const setCache = (key, data) => {
    client.setex(key, 3600, JSON.stringify(data)); // Cache for 1 hour
};

module.exports = { checkCache, setCache };
