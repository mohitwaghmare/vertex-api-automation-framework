import { defineConfig } from '@playwright/test';
import { environment } from './src/config/environment';

export default defineConfig({
  /**
   * Directory containing test files
   */
  testDir: './tests',

  /**
   * Execution Settings
   */
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,

  /**
   * Global Timeout
   */
  timeout: 30 * 1000,

  /**
   * Reporter
   */
  reporter: 'html',

  /**
   * Shared Settings
   */
  use: {
    baseURL: environment.baseUrl,
    actionTimeout: environment.requestTimeout,
    trace: 'on-first-retry',
  },

  /**
   * Projects
   */
  projects: [
    {
      name: 'Vertex API',
    },
  ],
});