import asyncHandler from 'express-async-handler';

import ApiError from '../../errors/ApiError';
import UserModel from '../../models/user.model';
import { comparePassword, hashPassword } from '../../utils/password.util';
import { generateToken } from '../../utils/token.util';

// route:   PUT /auth.update/password
// access:  current-logged-user
export const updatePassword = asyncHandler(async (req, res, next) => {
  const { oldPassword, newPassword } = req.body;
  if (!oldPassword || !newPassword)
    return next(new ApiError('new and old passwords are required', 400));
  const user = await UserModel.findOne({
    attributes: ['id', 'email', 'password'],
    where: { id: res.locals.userId },
  });
  if (!user || !comparePassword(oldPassword, user.password))
    return next(new ApiError('incorrect password', 400));
  const token = generateToken(user.id);
  const newHashedPassword = hashPassword(newPassword);
  await user.update({ token, password: newHashedPassword });
  res.status(200).json({ token, id: user.id });
});
