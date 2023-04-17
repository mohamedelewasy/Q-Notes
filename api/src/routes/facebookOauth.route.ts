import { Router } from 'express';
import passport from 'passport';

const router = Router();
router.get(
  '/auth/facebook',
  passport.authenticate('facebook', { scope: ['public_profile', 'email'] })
);
router.get(
  '/auth/facebook/callback',
  passport.authenticate('facebook', {
    failureRedirect: `${process.env.DOMAIN_URL}/signin`,
  }),
  function (req, res) {
    res.cookie('token', (req.user as { token: string }).token);
    res.redirect(`${process.env.DOMAIN_URL}/signin/facebook`);
  }
);

export default router;
