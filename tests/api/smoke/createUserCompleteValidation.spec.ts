import { test, expect } from '@playwright/test'; // Import Playwright test runner and assertion library
import { environment } from '../../../src/config/environment'; // Import environment configuration

// Define the user data to send to the API
const userData = {
    name: 'Mohit',
    job: 'QA Automation Engineer',
};

// Test Case
test('Create User and Validate Complete Response', async ({ request }) => {

    // Send POST request with user data
    const response = await request.post('/api/users', {
        headers: {
            'x-api-key': environment.apiKey,
        },
        data: userData,
    });

    // Print HTTP status code
    console.log('Status Code:', response.status());

    // Convert response into a JavaScript object
    const body = await response.json();

    // Capture response headers
    const headers = response.headers();

    // Print response body
    console.log('Response Body:', body);

    // Print response headers
    console.log('Response Headers:', headers);

    // Validate successful resource creation
    expect(response.status()).toBe(201);

    // Validate returned name against request data
    expect(body.name).toBe(userData.name);

    // Validate returned job against request data
    expect(body.job).toBe(userData.job);

    // Validate that the server generated an ID
    expect(body.id).toBeDefined();

    // Validate that the server-generated ID is a string
    expect(typeof body.id).toBe('string');

    // Validate that the server generated a creation timestamp
    expect(body.createdAt).toBeDefined();

    // Validate that the creation timestamp is a string
    expect(typeof body.createdAt).toBe('string');

    // Validate that Content-Type header exists
    expect(headers['content-type']).toBeDefined();

    // Validate that the response contains JSON content
    expect(headers['content-type']).toContain('application/json');

});