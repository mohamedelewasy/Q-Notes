import dotenv from 'dotenv';

dotenv.config();

export const ENV = {
  ENVIRONMENT: process.env.ENV || 'development',
  PORT: process.env.PORT || '3000',
  API_URL: process.env.API_URL || '',
  DOMAIN_URL: process.env.DOMAIN_URL || '',
  SESSION_SECRET: process.env.SESSION_SECRET || 'cap keyboard',
  POSTGRES: {
    HOST: process.env.PG_HOST || '',
    DB: process.env.PG_DB || '',
    PORT: process.env.PG_PORT || '',
    USER: process.env.PG_USER || '',
    PASSWORD: process.env.PG_PASSWORD,
  },
  BCRYPT: {
    SALT_ROUND: process.env.SALT_ROUND || '',
    PAPER: process.env.PAPER || '',
  },
  JWT: {
    SECRET: process.env.JWT_SECRET || '',
  },
  EMAIL: {
    USER: process.env.MAIL_USER || '',
    PASSWORD: process.env.MAIL_PASSWORD || '',
    PORT: process.env.MAIL_PORT || '',
    HOST: process.env.MAIL_HOST || '',
  },
  OAUTH: {
    FACEBOOK: {
      ID: process.env.FACEBOOK_APP_ID || '',
      SECRET: process.env.FACEBOOK_APP_SECRET || '',
    },
  },
};
