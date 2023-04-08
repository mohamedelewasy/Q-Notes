import { RequestHandler } from 'express';
import { validationResult } from 'express-validator';

export const validator: RequestHandler = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array().map(e => e.msg) });
  }
  next();
};
