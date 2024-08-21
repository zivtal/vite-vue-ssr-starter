import dotenv from 'dotenv';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const IS_PRODUCTION = process.env.NODE_ENV === 'production';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const resolve = (p: string) => path.resolve(__dirname, p);

try {
  dotenv.config({ path: resolve(IS_PRODUCTION ? '../../.env' : '../../.env.development') });
} catch (e) {
  console.error('dotenv:file', e);
  dotenv.config();
}

export default {
  IS_PROD_ENV: IS_PRODUCTION,
  PORT: process.env.PORT || 4000,
  BASE_URL: process.env.BASE_URL || '/',
  BASE_API: process.env.BASE_API || '/api',
  SESSION_KEY: process.env.SESSION_KEY!,
};
