// VidVibe//backend//src/tests/api.test.js
const request = require('supertest');
const path = require('path');
const server = require('../index'); // Assuming your Express app is exported from index.js

// Ensure the server is closed after all tests
afterAll(() => {
    server.close();
});

let token; // To store the JWT token for protected route testing

describe('VidVibe API', () => {
    // Test User Registration
    it('should register a new user', async () => {
        const res = await request(server)
            .post('/api/users/register')
            .send({
                username: 'testuser',
                password: 'password123'
            });
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('token');
        token = res.body.token; // Save the token for further tests
    });

    // Test User Login
    it('should login an existing user', async () => {
        const res = await request(server)
            .post('/api/users/login')
            .send({
                username: 'testuser',
                password: 'password123'
            });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('token');
        token = res.body.token; // Save the token for further tests
    });

    // Test Protected Route (e.g., Video Upload)
    it('should not upload a video without a token', async () => {
        const res = await request(server)
            .post('/api/videos/upload')
            .send({
                title: 'Test Video',
                description: 'This is a test video'
            });
        expect(res.statusCode).toEqual(401); // Unauthorized
    });

    it('should upload a video with a valid token', async () => {
        const res = await request(server)
            .post('/api/videos/upload')
            .set('Authorization', `Bearer ${token}`)
            .field('title', 'Test Video')
            .field('description', 'This is a test video')
            .attach('video', path.join(__dirname, 'assets', 'video.mp4'));
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('filePath');
    });

    // Test Commenting on a Video
    it('should allow commenting on a video', async () => {
        const videoRes = await request(server)
            .post('/api/videos/upload')
            .set('Authorization', `Bearer ${token}`)
            .field('title', 'Test Video for Comment')
            .field('description', 'This is a test video for commenting')
            .attach('video', path.join(__dirname, 'assets', 'video.mp4'));

        const res = await request(server)
            .post('/api/comments/')
            .set('Authorization', `Bearer ${token}`)
            .send({
                videoId: videoRes.body._id,
                text: 'This is a test comment'
            });
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('text', 'This is a test comment');
    });

    // Test Liking a Video
    it('should allow liking a video', async () => {
        const videoRes = await request(server)
            .post('/api/videos/upload')
            .set('Authorization', `Bearer ${token}`)
            .field('title', 'Test Video for Like')
            .field('description', 'This is a test video for liking')
            .attach('video', path.join(__dirname, 'assets', 'video.mp4'));

        const res = await request(server)
            .post('/api/likes/')
            .set('Authorization', `Bearer ${token}`)
            .send({
                videoId: videoRes.body._id
            });
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('user', expect.any(String));
    });

    // Test Search Functionality
    it('should return search results for videos', async () => {
        const res = await request(server)
            .get('/api/search?query=test')
            .set('Authorization', `Bearer ${token}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toBeInstanceOf(Array);
    });

    // Test Notification Retrieval
    it('should retrieve notifications for the user', async () => {
        const res = await request(server)
            .get('/api/notifications/')
            .set('Authorization', `Bearer ${token}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toBeInstanceOf(Array);
    });
});
