import asyncHandler from 'express-async-handler';

import ApiError from '../../errors/ApiError';
import DocModel from '../../models/doc.model';

// route:   PATCH /doc/:id
// access:  admin
export const updateDoc = asyncHandler(async (req, res, next) => {
  const document = await DocModel.update(req.body, {
    where: { id: req.params.id },
  });
  if (!document) return next(new ApiError('document not found', 404));
  res.sendStatus(200);
});
