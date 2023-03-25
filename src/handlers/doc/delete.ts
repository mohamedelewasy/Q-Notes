import asyncHandler from 'express-async-handler';

import ApiError from '../../errors/ApiError';
import DocModel from '../../models/doc.model';

// route:   DELETE /doc/:id
// access:  admin
export const deleteDoc = asyncHandler(async (req, res, next) => {
  const document = await DocModel.findByPk(req.params.id);
  if (!document) return next(new ApiError('document not found', 404));
  await document.destroy();
  res.status(200);
});
