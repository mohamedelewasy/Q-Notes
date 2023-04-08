import asyncHandler from 'express-async-handler';
import multer, { memoryStorage } from 'multer';
import path from 'path';
import sharp from 'sharp';
import { uuid } from 'uuidv4';

import ApiError from '../errors/ApiError';

const upload = multer({
  storage: memoryStorage(),
  fileFilter(req, file, callback) {
    if (file.mimetype.startsWith('image')) callback(null, true);
    else callback(new ApiError('only images allowed', 400));
  },
});

export const uploadImage = upload.fields([
  { name: 'pdf', maxCount: 1 },
  { name: 'thumbnail', maxCount: 1 },
]);

export const resizeImage = asyncHandler(async (req, res, next) => {
  if (req.file) {
    const imageId = `${uuid()}.jpeg`;
    await sharp(req.file.buffer)
      .resize(1000, 1000)
      .toFormat('jpeg')
      .toFile(path.join(__dirname, `../uploads/${imageId}`));
    req.body.thumbnail = imageId;
  }
  next();
});
