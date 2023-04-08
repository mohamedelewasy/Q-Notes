import multer, { diskStorage } from 'multer';
import path from 'path';
import { uuid } from 'uuidv4';

import { __BASEdIRECTORY } from '../app';
import ApiError from '../errors/ApiError';

export const upload = multer({
  storage: diskStorage({
    destination(req, file, callback) {
      if (file.fieldname === 'pdf') callback(null, path.join(__BASEdIRECTORY, 'uploads/pdf'));
      else if (file.fieldname === 'thumbnail')
        callback(null, path.join(__BASEdIRECTORY, 'uploads/thumbnail'));
    },
    filename(req, file, callback) {
      if (file.fieldname === 'pdf') {
        const fileId = uuid() + '.pdf';
        req.body.pdf = fileId;
        callback(null, fileId);
      } else if (file.fieldname === 'thumbnail') {
        const fileExtention = file.originalname.split('.');
        const fileId = uuid() + '.' + fileExtention[fileExtention.length - 1];

        req.body.thumbnail = fileId;
        callback(null, fileId);
      }
    },
  }),
  limits: {
    fileSize: 20 * 1024 * 1024,
  },
  fileFilter(req, file, callback) {
    if (file.fieldname === 'pdf') {
      if (file.mimetype.endsWith('pdf')) callback(null, true);
      else callback(new ApiError('invalid pdf', 400));
    } else if (file.fieldname === 'thumbnail') {
      if (file.mimetype.startsWith('image')) callback(null, true);
      else callback(new ApiError('only images allowed', 400));
    }
  },
}).fields([
  { name: 'pdf', maxCount: 1 },
  { name: 'thumbnail', maxCount: 1 },
]);
