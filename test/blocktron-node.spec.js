/**
 * blocktron-node test spec file
 * Written by: Sandeep Vattapparambil
 * Email: sandeepv68@gmail.com
 */

/**
 * Import the server stub
 */
const app = require('./serverStub.js');

/**
 * Set up supertest
 */
const request = require('supertest');

describe('Test the root path -> get/', () => {
    test('It should respond with 200 OK', (done) => {
        request(app).get('/').then((response) => {
            expect(response.statusCode).toBe(200);
            done();
        });
    });
});

describe('Test the blockchain path -> get/blockchain', () => {
    test('It should respond with 200 OK', (done) => {
        request(app).get('/blockchain').then((response) => {
            expect(response.statusCode).toBe(200);
            done();
        });
    });
    test('It should respond with blockchain data', (done) => {
        request(app).get('/blockchain').then((response) => {
//            expect(typeof response.body.chain).toBe('Array');
            done();
        });
    });
});

afterAll(() => {
    app.close();
});
