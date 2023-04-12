import asyncHandler from 'express-async-handler';

import ApiError from '../../errors/ApiError';
import UserModel from '../../models/user.model';
import { comparePassword, hashPassword } from '../../utils/password.util';
import { sendVerificationMail } from '../../utils/sendMail.util';
import { generateToken } from '../../utils/token.util';
import { generateVerificationCode } from '../../utils/verificationCode.util';

// route:   PUT /auth.update/email
// access:  current-logged-user
export const updateEmail = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) return next(new ApiError('email and password are required', 400));
  const user = await UserModel.findOne({
    attributes: ['id', 'email', 'password'],
    where: { id: res.locals.userId },
  });
  if (!user || !comparePassword(password, user.password))
    return next(new ApiError('incorrect password', 400));
  if (await UserModel.findOne({ where: { email } }))
    return next(new ApiError('email is already exists', 400));
  const token = generateToken(user.id);
  const plainVerificationCode = generateVerificationCode();
  const verificationCode = hashPassword(plainVerificationCode);
  await user.update({ token, email, isActive: false, verificationCode });
  sendVerificationMail(plainVerificationCode, email);
  res.status(200).json({ token, id: user.id });
});
