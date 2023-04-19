import { JWT } from '@english/shared';
import jwt from 'jsonwebtoken';

import { ENV } from '../config/env';

export const generateToken = (userId: string) => {
  const JWT_SECRET = ENV.JWT.SECRET;
  if (!JWT_SECRET) {
    // eslint-disable-next-line no-console
    console.log('jwt secret is missing');
    process.exit(1);
  }
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '1d' });
};

export const verifyToken = (token: string) => {
  const JWT_SECRET = ENV.JWT.SECRET;
  if (!JWT_SECRET) {
    // eslint-disable-next-line no-console
    console.log('jwt secret is missing');
    process.exit(1);
  }
  try {
    const obj = jwt.verify(token, JWT_SECRET) as JWT;
    return obj.userId;
  } catch (error) {
    throw new Error('bad token');
  }
};
