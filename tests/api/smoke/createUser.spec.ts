import { test, expect } from '@playwright/test'; // Import Playwright test runner and assertion library
import { environment } from '../../../src/config/environment'; // Import environment configuration

// Test Case
test('Create User', async ({ request }) => {

    // Send POST request with user details in the request body
    const response = await request.post('/api/users', {
        headers: {
            'x-api-key': environment.apiKey,
        },
        data: {
            name: 'Mohit',
            job: 'QA Automation Engineer',
        },
    });

    // Print HTTP status code
    console.log('Status Code:', response.status());

    // Convert response into a JavaScript object
    const body = await response.json();

    // Print response body
    console.log('Response Body:', body);

    // Store id into userId
    const userId = body.id;

    // Print userId
    console.log('Created User ID:', userId);

    // Validate userId against response
    expect(userId).toBeDefined();

    // Validate that the API created the user successfully
    expect(response.status()).toBe(201);

    // Validate that the returned name matches the request
    expect(body.name).toBe('Mohit');

    // Validate that the returned job matches the request
    expect(body.job).toBe('QA Automation Engineer');

    // Validate that the API generated an ID
    expect(body.id).toBeDefined();

    // Validate that the API generated a creation timestamp
    expect(body.createdAt).toBeDefined();

});