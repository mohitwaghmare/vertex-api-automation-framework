import { test, expect } from '@playwright/test'; // Import Playwright test runner and assertion library
import { environment } from '../../../src/config/environment'; // Import environment configuration

// Define valid user IDs for response validation
const testUsers = [1, 2, 12];

// Create a separate test for each valid user ID
for (const userId of testUsers) {

    // Define the test using the current user ID
    test(`Validate User Response for ID ${userId}`, async ({ request }) => {

        // Send GET request using the dynamic path parameter
        const response = await request.get(`/api/users/${userId}`, {
            headers: {
                'x-api-key': environment.apiKey,
            },
        });

        // Convert the response into a JavaScript object
        const body = await response.json();

        // Validate successful response
        expect(response.status()).toBe(200);

        // Validate that the returned ID matches the requested ID
        expect(body.data.id).toBe(userId);

        // Validate that the email field exists
        expect(body.data.email).toBeDefined();

        // Validate that the first name field exists
        expect(body.data.first_name).toBeDefined();

        // Validate that the last name field exists
        expect(body.data.last_name).toBeDefined();

        // Validate that the avatar URL exists
        expect(body.data.avatar).toBeTruthy();

        // Print Response Body
        console.log("Response Bdoy: ", body);

    });

}