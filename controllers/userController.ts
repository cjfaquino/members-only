import { RequestHandler } from 'express';
import bcryptjs from 'bcryptjs';
import User from '../models/User';
import { ValidationChain, body, validationResult } from 'express-validator';
import passport from 'passport';

export const sign_up_get: RequestHandler = (req, res, next) => {
  res.render('sign-up', { title: 'Sign Up' });
};

export const sign_up_post: [
  ValidationChain,
  ValidationChain,
  ValidationChain,
  ValidationChain,
  ValidationChain,
  RequestHandler
] = [
  // validate & sanitize fields
  body('firstName', 'First name is required.')
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body('lastName', 'Last name is required.')
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body('email')
    .trim()
    .normalizeEmail()
    .isEmail()
    .withMessage('Email is required.')
    .custom(async (value) => {
      const user = await User.findOne({ email: value });
      if (user) throw new Error('Email already exists.');
      return true;
    }),
  body('password')
    .trim()
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long')
    .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)
    .withMessage('Password must contain at least one letter and one number'),
  body('confirmPass').custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error('Password confirmation does not match password');
    }
    return true;
  }),

  // process request after validation & sanitization
  (req, res, next) => {
    // extract validation errors from request
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      // there are errors, render form again with sanitized values/ errors
      res.render('sign-up', {
        title: 'Sign Up',
        user: new User(req.body),
        errors: errors.array(),
      });
      return;
    }

    // hash password field
    bcryptjs.hash(req.body.password, 10, async (err, hashedPass) => {
      try {
        if (err) return next(err);

        // create User obj
        const user = new User({
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          password: hashedPass,
        });

        // success - redirect
        await user.save();
        res.redirect('/');
      } catch (error) {
        next(error);
      }
    });
  },
];

export const log_in_get: RequestHandler = (req, res, next) => {
  res.render('log-in', { title: 'Log In' });
};

export const log_in_post = [
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/log-in',
  }),
];

export const log_out_get: RequestHandler = (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);

    res.redirect('/');
  });
};
