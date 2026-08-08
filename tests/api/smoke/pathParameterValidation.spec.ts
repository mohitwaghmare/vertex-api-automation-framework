import { test, expect } from '@playwright/test'; // Import Playwright test runner and assertion library
import { environment } from '../../../src/config/environment'; // Import environment configuration

// Test Case
test('Get User by ID', async ({ request }) => {

    // Define the user ID dynamically
    const userId = 999;

    // Print the user ID being requested
    console.log('User ID Requested:', userId);

    // Send GET request using the user ID as a path parameter
    const response = await request.get(`/api/users/${userId}`, {
        headers: {
            'x-api-key': environment.apiKey,
        },
    });

    // Print HTTP status code
    console.log("Status Code: ", response.status());

    // Print Response Body
    console.log('Response Body:', await response.text());

    // Validate that the API returns 400 for a non-existent user
    expect(response.status()).toBe(404);

    // Validate that the response body is an empty object
    expect(await response.json()).toEqual({});

});