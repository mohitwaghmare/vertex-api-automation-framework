import { test, expect } from '@playwright/test'; // Import Playwright test runner and assertion library
import { environment } from '../../../src/config/environment'; // Import environment configuration

// Define invalid user data without the required job field
const userData = {
    name: 'Mohit',
};

// Test Case
test('Create User with Missing Job', async ({ request }) => {

    // Send POST request with incomplete user data
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

    // Print response body
    console.log('Response Body:', body);

});