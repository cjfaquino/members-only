import { Router } from 'express';
import {
  message_create_get,
  message_create_post,
  message_delete_post,
} from '../controllers/messageController';
import requireLogin from '../middlewares/requireLogin';
import requireAdmin from '../middlewares/requireAdmin';

const messageRouter = Router();

messageRouter.get('/new', requireLogin, message_create_get);

messageRouter.post('/new', requireLogin, message_create_post);

messageRouter.post('/delete/:id', requireAdmin, message_delete_post);

export default messageRouter;
