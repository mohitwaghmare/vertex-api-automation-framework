import { test, expect } from '@playwright/test';      // Import Playwright test runner and assertion library
import { environment } from '../../../src/config/environment'; // Import environment configuration

// Test Case
test('Valoidate Reponse', async ({ request }) => {

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

    // Store the first user object for better readability and reusability
    const firstUser = body.data[0];

    // Validate the User ID
    expect(firstUser.id).toBe(7);

    // Validate the First Name
    expect(firstUser.first_name).toBe('Michael');

    // Validate the Last Name
    expect(firstUser.last_name).toBe('Lawson');

    // Validate that the email contains '@'
    expect(firstUser.email).toContain('@');

    // Validate that the email belongs to the ReqRes domain
    expect(firstUser.email).toContain('reqres.in');

    // Validate that the avatar URL uses HTTPS
    expect(firstUser.avatar).toContain('https://');

});