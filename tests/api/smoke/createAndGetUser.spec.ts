import { test, expect } from '@playwright/test'; // Import Playwright test runner and assertion library
import { environment } from '../../../src/config/environment'; // Import environment configuration

// Test Case
test('Create and Get User', async ({ request }) => {

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
    console.log('POST Status Code:', response.status());

    // Convert POST response into a JavaScript object
    const body = await response.json();

    // Print POST response body
    console.log('POST Response Body:', body);

    // Store the server-generated ID
    const userId = body.id;

    // Print the generated user ID
    console.log('Created User ID:', userId);

    // Validate that the API generated a user ID
    expect(userId).toBeDefined();

    // Send GET request using the captured user ID
    const getResponse = await request.get(`/api/users/${userId}`, {
        headers: {
            'x-api-key': environment.apiKey,
        },
    });

    // Print GET status code
    console.log('GET Status Code:', getResponse.status());

    // Convert GET response into a JavaScript object
    const getBody = await getResponse.json();

    // Print GET response body
    console.log('GET Response Body:', getBody);

});