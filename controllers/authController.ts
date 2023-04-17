import { RequestHandler } from 'express';
import { ValidationChain, body, validationResult } from 'express-validator';
import User, { IUser } from '../models/User';
import createHttpError from 'http-errors';

export const auth_member_get: RequestHandler = (req, res, next) => {
  res.render('upgrade_form', { title: 'Membership' });
};

export const auth_member_post: [ValidationChain, RequestHandler] = [
  // trim fields and validate
  body('secret')
    .trim()
    .exists()
    .withMessage('Key is required.')
    .custom((value) => {
      const secret = process.env.MEMBERSHIP_SECRET || 'THE ODIN PROJECT';
      if (value !== secret) throw new Error('Key is not valid.');
      return true;
    }),

  // process request after trim & validation
  async (req, res, next) => {
    try {
      // extract validation errors from request
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        // there are errors, render form again with values/ errors
        res.render('upgrade_form', {
          title: 'Membership',
          secret: req.body.secret,
          errors: errors.array(),
        });
        return;
      }

      const user = req.user as IUser;
      // data from form is valid - check if already a member
      const found = await User.findById(user!._id);

      if (found === null) {
        // no results
        const err = createHttpError(404, 'User not found');
        return next(err);
      }

      if (found.membership) {
        // if already a member - render form again with error
        const err = { msg: 'Already a member.' };
        res.render('upgrade_form', { title: 'Membership', errors: [err] });
        return;
      }

      // update membership status
      await found.updateOne({ membership: true });

      // success - redirect
      res.redirect('/');
    } catch (error) {
      next(error);
    }
  },
];

export const auth_admin_get: RequestHandler = (req, res, next) => {
  res.render('upgrade_form', { title: 'Admin' });
};

export const auth_admin_post: [ValidationChain, RequestHandler] = [
  // trim fields and validate
  body('secret')
    .trim()
    .isLength({ min: 1 })
    .withMessage('Key is required.')
    .custom((value) => {
      if (value !== process.env.ADMIN_SECRET) throw new Error('Key is invalid');
      return true;
    }),

  // process request after trim & validation
  async (req, res, next) => {
    try {
      // extract validation errors from request
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        // there are errors, render form again with values/ errors
        res.render('upgrade_form', {
          title: 'Admin',
          secret: req.body.secret,
          errors: errors.array(),
        });
        return;
      }

      const user = req.user as IUser;
      // data from form is valid - check if already a member
      const found = await User.findById(user!._id);

      if (found === null) {
        // no results
        const err = createHttpError(404, 'User not found');
        return next(err);
      }

      if (found.isAdmin) {
        // if already an admin - render form again with error
        const err = { msg: 'Already an admin.' };
        res.render('upgrade_form', { title: 'Admin', errors: [err] });
        return;
      }

      // update isAdmin status
      await found.updateOne({ isAdmin: true });

      // success - redirect
      res.redirect('/');
    } catch (error) {
      next(error);
    }
  },
];
