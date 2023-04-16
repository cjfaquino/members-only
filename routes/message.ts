import { Router } from 'express';
import {
  message_create_get,
  message_create_post,
} from '../controllers/messageController';
import requireLogin from '../middlewares/requiredLogin';

const messageRouter = Router();

messageRouter.get('/new', requireLogin, message_create_get);

messageRouter.post('/new', requireLogin, message_create_post);

export default messageRouter;
