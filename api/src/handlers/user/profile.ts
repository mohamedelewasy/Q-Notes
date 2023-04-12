import asyncHandler from 'express-async-handler';

import UserModel from '../../models/user.model';

// route:   POST /auth/signin
// access:  logged-user
export const profile = asyncHandler(async (req, res, next) => {
  const user = await UserModel.findByPk(res.locals.userId, { attributes: ['email', 'isAdmin'] });
  res.status(200).json(user);
});
