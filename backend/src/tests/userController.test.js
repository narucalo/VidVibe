// backend/src/tests/userController.test.js

jest.mock('mongoose', () => {
    const actualMongoose = jest.requireActual('mongoose');

    const fakeSchema = new actualMongoose.Schema();
    fakeSchema.statics.findOne = jest.fn().mockResolvedValue(null);
    fakeSchema.methods.save = jest.fn().mockResolvedValue({});

    const mockModel = function (doc) {
        this.save = jest.fn().mockResolvedValue(doc);
    };

    mockModel.findOne = jest.fn().mockResolvedValue(null);
    mockModel.create = jest.fn().mockResolvedValue({});

    return {
        ...actualMongoose,
        model: jest.fn().mockReturnValue(mockModel),
        connect: jest.fn().mockResolvedValue(),
        connection: {
            close: jest.fn().mockResolvedValue(),
        },
    };
});

const request = require('supertest');
const mongoose = require('mongoose');
const server = require('../index'); // Your express app

// Ensure the server is closed after all tests
afterAll(async () => {
    await mongoose.connection.close();
    await server.close();
});

describe('User API', () => {
    it('should register a user', async () => {
        const res = await request(server)
            .post('/api/users/register')
            .send({
                username: 'testuser',
                password: 'password123',
            });

        console.log('Response Status:', res.statusCode);
        console.log('Response Body:', res.body);

        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('token');
    });

    it('should not register a user with the same username', async () => {
        // Mock the findOne method to simulate an existing user
        mongoose.model().findOne.mockResolvedValueOnce({ username: 'testuser' });

        const res = await request(server)
            .post('/api/users/register')
            .send({
                username: 'testuser',
                password: 'password123',
            });

        expect(res.statusCode).toEqual(400);
        expect(res.body.message).toBe('User already exists');
    });
});
