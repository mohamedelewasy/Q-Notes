import { Router } from 'express';
import passport from 'passport';

import { ENV } from '../config/env';

const router = Router();
router.get(
  '/auth/facebook',
  passport.authenticate('facebook', { scope: ['public_profile', 'email'] })
);
router.get(
  '/auth/facebook/callback',
  passport.authenticate('facebook', {
    failureRedirect: `${ENV.DOMAIN_URL}/signin`,
  }),
  function (req, res) {
    res.cookie('token', (req.user as { token: string }).token);
    res.redirect(`${ENV.DOMAIN_URL}/signin/facebook`);
  }
);

export default router;
