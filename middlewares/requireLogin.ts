import { RequestHandler } from 'express';

const requireLogin: RequestHandler = (req, res, next) => {
  // if not logged in - redirect
  if (!req.user) return res.redirect('/log-in');
  next();
};

export default requireLogin;
