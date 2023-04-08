import dotenv from 'dotenv';
import { createTransport } from 'nodemailer';

dotenv.config();

export const mail = createTransport({
  port: +(process.env.MAIL_PORT || 0),
  host: process.env.MAIL_HOST,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASSWORD,
  },
  secure: true,
});
