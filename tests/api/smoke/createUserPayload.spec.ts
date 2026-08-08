import { test, expect } from '@playwright/test'; // Import Playwright test runner and assertion library
import { environment } from '../../../src/config/environment'; // Import environment configuration

// Define the user data to send to the API
const userData = {
    name: 'Mohit',
    job: 'QA Automation Engineer',
};

// Test Case
test('Create User and Validate Payload', async ({ request }) => {

    // Send POST request with user data
    const response = await request.post('/api/users', {
        headers: {
            'x-api-key': environment.apiKey,
        },
        data: userData,
    });

    // Validate successful resource creation
    expect(response.status()).toBe(201);

    // Convert response into a JavaScript object
    const body = await response.json();

    // Validate returned name against the request data
    expect(body.name).toBe(userData.name);

    // Validate returned job against the request data
    expect(body.job).toBe(userData.job);

    // Validate that the server generated an ID
    expect(body.id).toBeDefined();

    // Validate that the server generated a creation timestamp
    expect(body.createdAt).toBeDefined();

});