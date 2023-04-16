import { RequestHandler } from 'express';
import { IUser } from '../models/User';

const requireAdmin: RequestHandler = (req, res, next) => {
  const user = req.user as IUser;
  // continue if admin
  if (user && user.isAdmin) return next();

  // otherwise - redirect
  res.redirect('/');
};

export default requireAdmin;
