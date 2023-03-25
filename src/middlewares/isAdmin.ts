import asyncHandler from 'express-async-handler';

import ApiError from '../errors/ApiError';
import UserModel from '../models/user.model';

export const isAdmin = asyncHandler(async (req, res, next) => {
  const user = await UserModel.findByPk(res.locals.userId, { attributes: ['isAdmin'] });
  if (user?.isAdmin) return next();
  return next(new ApiError('access denied', 403));
});
