import { Router } from 'express';

import * as U from '../handlers/user';
import { protect } from '../middlewares/protect';

const router = Router();
router.route('/signin').post(U.signin);
router.route('/signup').post(U.signup);
router.route('/signout').post(protect, U.signout);
router.route('/profile').post(protect, U.profile);
router.route('/update/email').put(protect, U.updateEmail);
router.route('/update/password').put(protect, U.updatePassword);
router.route('/verify/:code').get(protect, U.verifyEmail);

// router.use('*', (req, res, next) => next(new ApiError('page not found', 404)));

export default router;
