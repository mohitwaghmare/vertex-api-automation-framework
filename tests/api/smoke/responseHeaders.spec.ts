import { test, expect } from '@playwright/test';
import { environment } from '../../../src/config/environment';

test('Validate Response Headers', async ({ request }) => {

    // Send GET Request
    const response = await request.get('/api/users?page=2', {
        headers: {
            'x-api-key': environment.apiKey,
        },
    });

    // Validate Status Code
    expect(response.status()).toBe(200);

    // Read all response headers
    const headers = await response.headers();

    console.log(headers);

    // Validate mandatory headers
    expect(headers).toHaveProperty('content-type');
    expect(headers).toHaveProperty('date');
    expect(headers).toHaveProperty('server');

    // Validate Content-Type
    expect(headers['content-type']).toContain('application/json');

    // Validate Server
    expect(headers['server']).toBe('cloudflare');

    // Validate ReqRes custom header
    expect(headers).toHaveProperty('x-request-id');

    // Validate Transfer-Encoding
    expect(headers['transfer-encoding']).toBe('chunked');

});