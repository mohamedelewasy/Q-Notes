import dotenv from 'dotenv';
import asyncHandler from 'express-async-handler';

import ApiError from '../../errors/ApiError';
import UserModel from '../../models/user.model';
import { comparePassword } from '../../utils/password.util';

dotenv.config();
// route:   POST /auth/verify/:code
// access:  logged-user
export const verifyEmail = asyncHandler(async (req, res, next) => {
  const user = await UserModel.findByPk(res.locals.userId);
  if (user?.isActive) return next(new ApiError('already verified!', 400));
  if (!user || !comparePassword(req.params.code, user.verificationCode))
    return next(new ApiError('invalid verification code', 401));
  user.isActive = true;
  user.verificationCode = '';
  await user.save();
  res.sendStatus(200);
});
