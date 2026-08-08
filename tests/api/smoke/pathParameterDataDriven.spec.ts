import { test, expect } from '@playwright/test'; // Import Playwright test runner and assertion library
import { environment } from '../../../src/config/environment'; // Import environment configuration

// Define test data with user IDs and their expected status codes
const testData = [
    { userId: 1, expectedStatus: 200 },
    { userId: 2, expectedStatus: 200 },
    { userId: 12, expectedStatus: 200 },
    { userId: 13, expectedStatus: 404 },
    { userId: 999, expectedStatus: 404 },
    { userId: 0, expectedStatus: 404 },
    { userId: -1, expectedStatus: 404 },
];

// Create a separate Playwright test for each test data combination
for (const data of testData) {

    // Define the test using the current user ID
    test(`Get User ${data.userId}`, async ({ request }) => {

        // Send GET request using the dynamic user ID
        const response = await request.get(`/api/users/${data.userId}`, {
            headers: {
                'x-api-key': environment.apiKey,
            },
        });

        // Print the user ID being tested
        console.log('User ID:', data.userId);

        // Print the actual status returned by the API
        console.log('Actual Status:', response.status());

        // Print the expected status from our test data
        console.log('Expected Status:', data.expectedStatus);

        // Validate the actual status against the expected status
        expect(response.status()).toBe(data.expectedStatus);

    });

}