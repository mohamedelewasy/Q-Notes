import { createTransport } from 'nodemailer';

import { ENV } from './env';

export const mail = createTransport({
  port: +(ENV.EMAIL.PORT || 0),
  host: ENV.EMAIL.HOST,
  auth: {
    user: ENV.EMAIL.USER,
    pass: ENV.EMAIL.PASSWORD,
  },
  secure: true,
});
