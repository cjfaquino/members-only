import { RequestHandler } from 'express';

export const auth_member_get: RequestHandler = (req, res, next) => {
  res.render('upgrade_form', { title: 'Membership' });
};

export const auth_member_post: RequestHandler = (req, res, next) => {
  res.send('TODO member POST');
};

export const auth_admin_get: RequestHandler = (req, res, next) => {
  res.render('upgrade_form', { title: 'Admin' });
};

export const auth_admin_post: RequestHandler = (req, res, next) => {
  res.send('TODO admin POST');
};
