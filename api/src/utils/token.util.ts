import { JWT } from '@english/shared';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();
export const generateToken = (userId: string) => {
  const JWT_SECRET = process.env.JWT_SECRET;
  if (!JWT_SECRET) {
    // eslint-disable-next-line no-console
    console.log('jwt secret is missing');
    process.exit(1);
  }
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '1d' });
};

export const verifyToken = (token: string) => {
  const JWT_SECRET = process.env.JWT_SECRET;
  if (!JWT_SECRET) {
    // eslint-disable-next-line no-console
    console.log('jwt secret is missing');
    process.exit(1);
  }
  try {
    console.error('\n\n\n', token);
    const obj = jwt.verify(token, JWT_SECRET) as JWT;
    return obj.userId;
  } catch (error) {
    console.log('\n\n\n');
    console.log(error);
    console.log('\n\n\n');
    throw new Error('bad token');
  }
};
