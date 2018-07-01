/**
 * blocktron-node test spec file
 * Written by: Sandeep Vattapparambil
 * Email: sandeepv68@gmail.com
 */

/**
 * Setup supertest to request app routes
 */
const request = require('supertest');

/**
 * Import the latest dev build 
 */
const app = require('../dist/main.js');

describe('Test the root path', () => {
    test('It should response the GET method', () => {
        return request(app).get('/').then(response => {
            expect(response.statusCode).toBe(200);
        });
    });
});
