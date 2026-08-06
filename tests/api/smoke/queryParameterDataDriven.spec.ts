import { test, expect } from '@playwright/test'; // Import Playwright test runner and assertion library
import { environment } from '../../../src/config/environment'; // Import environment configuration

// Test data for different page numbers
const testPages = [1, 2, 999];

// Execute the same test for each page number
for (const pageNumber of testPages) {

    // Test Case
    test(`Validate Users API for Page ${pageNumber}`, async ({ request }) => {

        // Print the page number being tested
        console.log(`Testing Page: ${pageNumber}`);

        // Record request start time
        const startTime = Date.now();

        // Send GET request with dynamic query parameters
        const response = await request.get('/api/users', {
            headers: {
                'x-api-key': environment.apiKey,
            },
            params: {
                page: pageNumber,
            },
        });

        // Calculate total response time
        const responseTime = Date.now() - startTime;

        // Print response time
        console.log('Response Time:', responseTime, 'ms');

        // Convert API response into JavaScript object
        const body = await response.json();

        // Print response body for debugging
        console.log(body);

        // Validate HTTP status code
        expect(response.status()).toBe(200);

        // Validate requested page number
        expect(body.page).toBe(pageNumber);

        // Validate response based on page number
        if (pageNumber === 999) {
            expect(body.data).toHaveLength(0);
        } else {
            expect(body.data).toHaveLength(6);
        }

    });

}