import multer, { diskStorage } from 'multer';
import path from 'path';
import { uuid } from 'uuidv4';

import { __BASEdIRECTORY } from '../app';
import ApiError from '../errors/ApiError';

export const upload = multer({
  storage: diskStorage({
    destination(req, file, callback) {
      callback(null, path.join(__BASEdIRECTORY, 'uploads'));
    },
    filename(req, file, callback) {
      const fileId = uuid();
      req.body.pdf = fileId;
      callback(null, fileId);
    },
  }),
  limits: {
    fileSize: 20 * 1024 * 1024,
  },
  fileFilter(req, file, callback) {
    if (file.mimetype.endsWith('pdf')) callback(null, true);
    else callback(new ApiError('invalid pdf', 400));
  },
}).single('pdf');
