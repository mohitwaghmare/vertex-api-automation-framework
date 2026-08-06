import { test, expect } from '@playwright/test'; // Import Playwright test runner and assertion library
import { environment } from '../../../src/config/environment'; // Import environment configuration

// Test Case
test('Query Parameters', async ({ request }) => {

    // Define page number dynamically
    const pageNumber = 2;

    // Print the page number being requested
    console.log('Page Requested:', pageNumber);

    // Record request start time
    const startTime = Date.now();

    // Send GET request with query parameters
    const response = await request.get('/api/users', {
        headers: {
            'x-api-key': environment.apiKey,
        },
        params: {
            page: pageNumber,
            delay: 3,
        },
    });

    // Calculate total response time
    const responseTime = Date.now() - startTime;

    // Print response time
    console.log('Response Time:', responseTime, 'ms');

    // Convert API response into JavaScript object
    const body = await response.json();

    // Validate HTTP status code
    expect(response.status()).toBe(200);

    // Validate requested page number
    expect(body.page).toBe(pageNumber);

    // Validate number of users returned
    expect(body.data).toHaveLength(6);

    // Validate response time is at least 3 seconds
    expect(responseTime).toBeGreaterThanOrEqual(3000);

});