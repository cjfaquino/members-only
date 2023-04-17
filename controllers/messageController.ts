import { RequestHandler } from 'express';
import { ValidationChain, body, validationResult } from 'express-validator';
import Message from '../models/Message';
import { IUser } from '../models/User';

export const index: RequestHandler = async (req, res, next) => {
  try {
    const perPage = 10;
    const page = (req.query.page as unknown as number) || 1;

    // display messages
    const messagesP = Message.find()
      .sort({ timestamp: -1 })
      .skip(perPage * page - perPage)
      .limit(perPage)
      .populate('author');
    const countP = Message.countDocuments();

    const [messages, count] = await Promise.all([messagesP, countP]);

    const pages = Math.ceil(count / perPage);

    if (page > pages) {
      // request page that doesn't exist yet - redirect
      res.redirect('/');
      return;
    }

    // success, so render
    res.render('index', {
      title: 'Express',
      messages,
      current: page,
      pages,
    });
  } catch (error) {
    next(error);
  }
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
      const author = (req.user as IUser)._id;
      const message = new Message({
        title: req.body.title,
        text: req.body.text,
        author,
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

export const message_delete_post: RequestHandler = async (req, res, next) => {
  try {
    // delete message object
    await Message.findByIdAndRemove(req.params.id);

    // success - redirect
    res.redirect('/');
  } catch (error) {
    next(error);
  }
};
