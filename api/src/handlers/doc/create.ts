import asyncHandler from 'express-async-handler';
import { uuid } from 'uuidv4';

import ApiError from '../../errors/ApiError';
import DocModel from '../../models/doc.model';

// route:   POST /doc/
// access:  admin
export const createDoc = asyncHandler(async (req, res, next) => {
  const { pdf, thumbnail, description, educationLevel, className, semester, title } = req.body;
  if (thumbnail == '' || thumbnail == 'undefined' || pdf == '' || pdf == 'undefined')
    return next(new ApiError('thumbnail and pdf are required', 400));
  const id = uuid();
  const document = await DocModel.create({
    id,
    pdf,
    thumbnail,
    description,
    educationLevel,
    className,
    semester,
    title,
  });
  res.status(200).json({ id: document.id });
});
