import { test, expect } from '@playwright/test'; // Import Playwright test runner and assertion library
import { environment } from '../../../src/config/environment'; // Import environment configuration

// Test Case
test('Heade Validation', async ({ request }) => {

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

    const headers = response.headers();

    console.log('Content-Type:', headers['content-type']);

    expect(headers['content-type']).toContain('application/json');

    expect(response.status()).toBe(201);

})