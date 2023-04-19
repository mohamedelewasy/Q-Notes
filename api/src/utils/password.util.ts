import { compareSync, hashSync } from 'bcrypt';

import { ENV } from '../config/env';

export const hashPassword = (password: string) => {
  const { PAPER, SALT_ROUND } = ENV.BCRYPT;
  if (!PAPER || !SALT_ROUND) {
    // eslint-disable-next-line no-console
    console.log('paper or salt is missing');
    process.exit(1);
  }
  return hashSync(password + PAPER, +SALT_ROUND);
};

export const comparePassword = (data: string, hashed: string) => {
  const { PAPER } = ENV.BCRYPT;
  return compareSync(data + PAPER, hashed);
};
