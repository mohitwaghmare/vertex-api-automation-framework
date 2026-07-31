import * as dotenv from 'dotenv';

dotenv.config();

export const environment = {
  env: process.env.ENV || 'QA',
  baseUrl: process.env.BASE_URL || '',
  apiKey: process.env.API_KEY || '',
  authToken: process.env.AUTH_TOKEN || '',
  requestTimeout: Number(process.env.REQUEST_TIMEOUT) || 30000,
};