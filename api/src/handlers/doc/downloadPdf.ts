import asyncHandler from 'express-async-handler';

import { ENV } from '../../config/env';
import ApiError from '../../errors/ApiError';
import DocModel from '../../models/doc.model';

// route:   GET /doc/:id/download
// access:  logged-user
export const downloadDoc = asyncHandler(async (req, res, next) => {
  const document = await DocModel.findByPk(req.params.id, { attributes: ['pdf'] });
  if (!document) return next(new ApiError('document not found', 404));
  res.status(200).redirect(`${ENV.API_URL}/api/v1/pdf/${document.pdf}`);
});
