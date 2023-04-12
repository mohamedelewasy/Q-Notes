import asyncHandler from 'express-async-handler';
import { uuid } from 'uuidv4';

import ApiError from '../../errors/ApiError';
import UserModel from '../../models/user.model';
import { hashPassword } from '../../utils/password.util';
import { sendVerificationMail } from '../../utils/sendMail.util';
import { generateToken } from '../../utils/token.util';
import { generateVerificationCode } from '../../utils/verificationCode.util';

// route:   POST /auth/signup
// access:  public
export const signup = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) return next(new ApiError('email and password are required', 400));
  if (password.length < 6) return next(new ApiError('password must be 6 or greater', 400));
  if (await UserModel.findOne({ where: { email } }))
    return next(new ApiError('email is already exists', 400));

  const hashedPassword = hashPassword(password);
  const id = uuid();
  const plainVerificationCode = generateVerificationCode();
  const verificationCode = hashPassword(plainVerificationCode);
  const user = await UserModel.create({
    id,
    email,
    password: hashedPassword,
    verificationCode,
  });

  sendVerificationMail(plainVerificationCode, email);
  const token = generateToken(user.id);
  res.locals.userId = user.id;
  await user.update({ token });
  res.status(200).json({ token, id: user.id });
});
