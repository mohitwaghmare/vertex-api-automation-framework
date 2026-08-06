import { test, expect } from '@playwright/test';      // Import Playwright test runner and assertion library
import { environment } from '../../../src/config/environment'; // Import environment configuration

// Test Case
test('Get Users from 2nd Page', async ({ request }) => {

    // Send GET request to retrieve users from page 2
    const response = await request.get('/api/users?page=2', {

        // Pass API Key in request headers for authentication
        headers: {
            'x-api-key': environment.apiKey,
        },
    });

    // Print HTTP Status Code for debugging
    console.log('Status Code :', response.status());

    // Convert API response from JSON to JavaScript object
    const body = await response.json();

    // Store first user object for better readability and reusability
    const firstUser = body.data[0];

    // Validate that the User ID is greater than zero
    expect(firstUser.id).toBeGreaterThan(0);

    // Validate that exactly six users are returned
    expect(body.data).toHaveLength(6);

    // Validate that the email follows a valid email format
    expect(firstUser.email).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);

    // Validate that the avatar URL is present and not empty
    expect(firstUser.avatar).toBeTruthy();

    // Validate that the first name field exists in the response
    expect(firstUser.first_name).toBeDefined();

});