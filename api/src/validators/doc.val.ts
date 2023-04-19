import { body } from 'express-validator';

import { validator } from '../middlewares/validator';

export const createDocVal = [
  body('pdf').notEmpty().withMessage('pdf is required'),
  body('description').notEmpty().withMessage('description is required'),
  body('educationLevel').notEmpty().withMessage('education level is required'),
  body('className').notEmpty().withMessage('class name is required'),
  body('semester').notEmpty().withMessage('semester is required'),
  body('title').notEmpty().withMessage('title is required'),
  validator,
];

export const updateDocVal = [
  body('pdf').optional().notEmpty().withMessage('pdf is required'),
  body('description').optional().notEmpty().withMessage('description is required'),
  body('educationLevel').optional().notEmpty().withMessage('education level is required'),
  body('className').optional().notEmpty().withMessage('class name is required'),
  body('semester').optional().notEmpty().withMessage('semester is required'),
  body('title').optional().notEmpty().withMessage('title is required'),
  validator,
];
