import asyncHandler from 'express-async-handler';

import UserModel from '../../models/user.model';

// route:   POST /auth/signout
// access:  logged-user
export const signout = asyncHandler(async (req, res) => {
  await UserModel.update({ token: '' }, { where: { id: res.locals.userId } });
  req.headers.authorization = undefined;
  res.locals.userId = undefined;
  res.sendStatus(200);
});
