import asyncHandler from 'express-async-handler';
import { uuid } from 'uuidv4';

import DocModel from '../../models/doc.model';

// route:   POST /doc/
// access:  admin
export const createDoc = asyncHandler(async (req, res) => {
  const { pdf, thumbnail, description, educationLevel, className, semester, title, price } =
    req.body;
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
    price,
  });
  res.status(200).json({ id: document.id });
});
