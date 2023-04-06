import { Router } from 'express';

import ApiError from '../errors/ApiError';
import * as U from '../handlers/user';
import { protect } from '../middlewares/protect';

const router = Router();
router.route('/signin').post(U.signin);
router.route('/signup').post(U.signup);
router.route('/signout').post(protect, U.signout);
router.route('/verify/:code').get(protect, U.verifyEmail);

// router.use('*', (req, res, next) => next(new ApiError('page not found', 404)));

export default router;
