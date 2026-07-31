import { test } from '@playwright/test';
import { environment } from '../../../src/config/environment';

test('Verify environment configuration', async () => {
  console.log('Environment :', environment.env);
  console.log('Base URL    :', environment.baseUrl);
  console.log('Timeout     :', environment.requestTimeout);
});