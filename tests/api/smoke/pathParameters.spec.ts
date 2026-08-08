import { test, expect } from '@playwright/test'; // Import Playwright test runner and assertion library
import { environment } from '../../../src/config/environment'; // Import environment configuration

// Test Case
test('Get User by ID', async ({ request }) => {

    // Define the user ID dynamically
    const userId = 2;

    // Print the user ID being requested
    console.log('User ID Requested:', userId);

    // Send GET request using the user ID as a path parameter
    const response = await request.get(`/api/users/${userId}`, {
        headers: {
            'x-api-key': environment.apiKey,
        },
    });

    // Validate HTTP status code
    expect(response.status()).toBe(200);

    // Convert API response into JavaScript object
    const body = await response.json();

    // Print response body
    console.log('Response Body:', body);

    // Validate returned user ID
    expect(body.data.id).toBe(userId);

});