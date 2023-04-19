import Strategy from 'passport-facebook';
import { uuid } from 'uuidv4';

import UserModel from '../models/user.model';
import { generateToken } from '../utils/token.util';
import { ENV } from './env';

const FacebookStrategy = Strategy.Strategy;
export const faceBookStrategy = new FacebookStrategy(
  {
    clientID: ENV.OAUTH.FACEBOOK.ID,
    clientSecret: ENV.OAUTH.FACEBOOK.ID,
    callbackURL: `${ENV.API_URL}/auth/facebook/callback`,
    profileFields: ['id', 'email', 'name'],
    enableProof: true,
  },
  function (accessToken, refreshToken, profile, cb) {
    const facebookId = profile.id;
    UserModel.findOne({ where: { facebookId } }).then(res => {
      if (res) {
        res.update({ token: generateToken(res.id) });
        res.save().then(() => cb(null, { token: res.token }));
      } else {
        const id = uuid();
        UserModel.create({
          id,
          isActive: true,
          token: generateToken(id),
          facebookId,
          email: profile._json.email,
        }).then(user => {
          user.save();
          cb(null, { token: user.token });
        });
      }
    });
  }
);
