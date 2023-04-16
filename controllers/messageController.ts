import { RequestHandler } from 'express';

export const index: RequestHandler = (req, res, next) => {
  res.render('index', { title: 'Express' });
};

export const message_create_get: RequestHandler = (req, res, next) => {
  res.render('message_create', { title: 'New Message' });
};

export const message_create_post: RequestHandler = (req, res, next) => {
  res.send('TODO: message post');
};
