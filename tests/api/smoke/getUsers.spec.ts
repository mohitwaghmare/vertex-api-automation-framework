import { test, expect } from '@playwright/test';      // Import Playwright test runner and assertion library
import { environment } from '../../../src/config/environment'; // Import environment configuration

// Test Case
test('Get Users from 2nd Page', async ({ request }) => {

    // Send GET request to fetch users from page 2
    const response = await request.get('/api/users?page=2', {

        // Pass API Key in request header
        headers: {
            'x-api-key': environment.apiKey,
        },
    });

    // Print HTTP Status Code
    console.log('Status Code :', response.status());

    // Convert JSON response into JavaScript object
    const body = await response.json();

    // Validate Status Code
    expect(response.status()).toBe(200);

    // Print whether request was successful
    console.log("Success:", response.ok());

    // Print current page number
    console.log("Page Number:", body.page);

    // Print number of records per page
    console.log("Per Page:", body.per_page);

    // Print total number of records
    console.log("Total Items:", body.total);

    // Print total available pages
    console.log("Total Pages:", body.total_pages);

    // Print users array
    console.log("Response Body:", body.data);

    // Print complete response
    console.log("Raw Body:", body);

    // Validate page number
    expect(body.page).toBe(2);

    // Validate records per page
    expect(body.per_page).toBe(6);

    // Validate total records
    expect(body.total).toBe(12);

    // Validate total pages
    expect(body.total_pages).toBe(2);

    // Validate number of users returned
    expect(body.data.length).toBe(6);

    // Validate first user's ID
    expect(body.data[0].id).toBe(7);

    // Validate first user's first name
    expect(body.data[0].first_name).toBe('Michael');

    // Validate first user's last name
    expect(body.data[0].last_name).toBe('Lawson');

});