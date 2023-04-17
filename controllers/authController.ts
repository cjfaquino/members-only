import { RequestHandler } from 'express';

export const auth_member_get: RequestHandler = (req, res, next) => {
  res.send('TODO member GET');
};

export const auth_member_post: RequestHandler = (req, res, next) => {
  res.send('TODO member POST');
};

export const auth_admin_get: RequestHandler = (req, res, next) => {
  res.send('TODO admin GET');
};

export const auth_admin_post: RequestHandler = (req, res, next) => {
  res.send('TODO admin POST');
};
