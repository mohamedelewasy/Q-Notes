import asyncHandler from 'express-async-handler';

import ApiError from '../../errors/ApiError';
import DocModel from '../../models/doc.model';

// route:   GET /doc/:id
// access:  public
export const getDoc = asyncHandler(async (req, res, next) => {
  const document = await DocModel.findOne({
    where: { id: req.params.id },
    attributes: [
      'id',
      'className',
      'description',
      'educationLevel',
      'semester',
      'thumbnail',
      'title',
      'updatedAt',
    ],
  });
  if (!document) return next(new ApiError('document not found', 404));
  res.status(200).json(document);
});
