import dotenv from 'dotenv';
import express, { Router } from 'express';
import path from 'path';

import { docEndpoints, userEndpoints } from '../types/endpoints';

dotenv.config();

const router = Router();
const url = process.env.URL || '';
router.route('/p/').get((req, res) =>
  res.render('index', {
    request: {
      profile: { url: url + userEndpoints.profile.url, method: userEndpoints.profile.method },
      signout: { url: url + userEndpoints.signout.url, method: userEndpoints.signout.method },
      docList: { url: url + docEndpoints.getDocList.url, method: docEndpoints.getDocList.method },
    },
    redirectTo: url + '/p',
  })
);
router.route('/p/:id').get((req, res) =>
  res.render('detail', {
    request: {
      profile: { url: url + userEndpoints.profile.url, method: userEndpoints.profile.method },
      signout: { url: url + userEndpoints.signout.url, method: userEndpoints.signout.method },
      docDetail: { url: url + docEndpoints.getDoc.url, method: docEndpoints.getDoc.method },
    },
    redirectTo: url + '/p',
  })
);
router.route('/a/signin').get((req, res) =>
  res.render('signin', {
    request: {
      signin: { url: url + userEndpoints.signin.url, method: userEndpoints.signin.method },
      profile: { url: url + userEndpoints.profile.url, method: userEndpoints.profile.method },
      signout: { url: url + userEndpoints.signout.url, method: userEndpoints.signout.method },
    },
    redirectTo: url + '/p',
  })
);
router.route('/a/signup').get((req, res) =>
  res.render('signup', {
    request: {
      signup: { url: url + userEndpoints.signup.url, method: userEndpoints.signup.method },
      profile: { url: url + userEndpoints.profile.url, method: userEndpoints.profile.method },
      signout: { url: url + userEndpoints.signout.url, method: userEndpoints.signout.method },
    },
    redirectTo: url + '/p',
  })
);

export default router;
