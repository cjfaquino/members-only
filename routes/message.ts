import { Router } from 'express';
import {
  message_create_get,
  message_create_post,
} from '../controllers/messageController';

const messageRouter = Router();

messageRouter.get('/new', message_create_get);

messageRouter.post('/new', message_create_post);

export default messageRouter;
