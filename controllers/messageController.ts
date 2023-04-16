import { RequestHandler } from 'express';
import { ValidationChain, body, validationResult } from 'express-validator';
import Message from '../models/Message';

export const index: RequestHandler = (req, res, next) => {
  res.render('index', { title: 'Express' });
};

export const message_create_get: RequestHandler = (req, res, next) => {
  res.render('message_create', { title: 'New Message' });
};

export const message_create_post: [
  ValidationChain,
  ValidationChain,
  RequestHandler
] = [
  // validate & sanitize fields
  body('title', 'Title is required.').trim().exists().escape(),
  body('text', 'Body text is required.').trim().exists().escape(),

  // process request after validation & sanitization
  async (req, res, next) => {
    try {
      // extract validation errors from request
      const errors = validationResult(req);

      // create Message obj
      const message = new Message({
        title: req.body.title,
        text: req.body.text,
      });

      if (!errors.isEmpty()) {
        // there are errors, render form again with sanitized values/ errors
        res.render('message_create', {
          title: 'New Message',
          message,
          errors: errors.array(),
        });
        return;
      }

      // data from form are valid
      // save message
      await message.save();

      // success - redirect
      res.redirect('/');
    } catch (error) {
      next(error);
    }
  },
];
