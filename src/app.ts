/* eslint-disable no-console */
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import morgan from 'morgan';

import sequelize from './config/db';
// test app health
import { errorHandler } from './middlewares/errorHandler';
import apiRoutes from './routes/index';

dotenv.config();
const app = express();
const env = process.env.ENV;

app.use(cors());
app.use(express.json());
// logger
if (env === 'development') app.use(morgan('short'));

app.get('/healthz', (req, res) => {
  res.status(200).send('ok');
});

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
