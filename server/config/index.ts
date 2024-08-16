import dotenv from 'dotenv';

dotenv.config();

export default {
  IS_PROD_ENV: process.env.NODE_ENV === 'production',
  PORT: process.env.PORT || 4000,
  BASE_URL: process.env.BASE_URL || '/',
  SESSION_KEY: process.env.SESSION_KEY,
};
