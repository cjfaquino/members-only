import { RequestHandler } from 'express';

const saveUser: RequestHandler = (req, res, next) => {
  res.locals.currentUser = req.user;
  next();
};

export default saveUser;
