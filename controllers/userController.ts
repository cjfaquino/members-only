import { RequestHandler } from 'express';

export const sign_up_get: RequestHandler = (req, res, next) => {
  res.render('sign-up', { title: 'Sign Up' });
};

export const sign_up_post: RequestHandler = (req, res, next) => {
  res.send('TODO: Sign Up Post');
};

export const log_in_get: RequestHandler = (req, res, next) => {
  res.send('TODO: Log In Get');
};

export const log_in_post: RequestHandler = (req, res, next) => {
  res.send('TODO: Log In Post');
};
