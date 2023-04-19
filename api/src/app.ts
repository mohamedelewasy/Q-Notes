/* eslint-disable no-console */
import cors from 'cors';
import express from 'express';
import session from 'express-session';
import morgan from 'morgan';
import passport from 'passport';
import path from 'path';

import sequelize from './config/db';
import { ENV } from './config/env';
import { faceBookStrategy } from './config/facebook.oAuth';
import { errorHandler } from './middlewares/errorHandler';
import UserModel from './models/user.model';
import facebookOAuthRoutes from './routes/facebookOauth.route';
import apiRoutes from './routes/index';

const app = express();
const env = ENV.ENVIRONMENT;

app.use(cors({ origin: ENV.DOMAIN_URL, credentials: true }));
app.use(express.json());
// logger
if (env === 'development') app.use(morgan('short'));

// express session
app.use(session({ secret: ENV.SESSION_SECRET || 'k', resave: true, saveUninitialized: true }));

// test app health
app.get('/healthz', (req, res) => {
  res.status(200).send('ok');
});

// facebook oAuth
passport.use(faceBookStrategy);
passport.serializeUser((user, done) => done(null, (user as { token: string }).token));
passport.deserializeUser((id, done) =>
  done(
    null,
    UserModel.findByPk(id as string).then(user => done(null, user))
  )
);

app.use(facebookOAuthRoutes);

// public thumbnails
app.use('/api/v1/images', express.static(path.join(__dirname, '/uploads/thumbnail')));
app.use('/api/v1/pdf', express.static(path.join(__dirname, '/uploads/pdf')));

// api routes
app.use('/api/v1', apiRoutes);

// notfound handler
app.use('*', (req, res) => res.status(404).json({ error: 'page not found' }));

// error handler
app.use(errorHandler);

// connect db
sequelize
  .authenticate()
  .then(() => console.log('db connecetd...'))
  .catch(err => {
    console.log(err);
    process.exit(1);
  });

export default app;
export const __BASEdIRECTORY = __dirname;
