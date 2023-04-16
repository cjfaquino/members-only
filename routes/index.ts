import { Router } from 'express';
import { index } from '../controllers/messageController';
import {
  log_in_get,
  log_in_post,
  log_out_get,
  sign_up_get,
  sign_up_post,
} from '../controllers/userController';
import saveUser from '../middlewares/saveUser';

const indexRouter = Router();

// GET Home page
indexRouter.get('/', saveUser, index);

// GET Sign Up page
indexRouter.get('/sign-up', sign_up_get);

// POST Sign Up
indexRouter.post('/sign-up', sign_up_post);

// GET Log in page
indexRouter.get('/log-in', log_in_get);

// POST Log in
indexRouter.post('/log-in', log_in_post);

// GET Log out
indexRouter.get('/log-out', log_out_get);

export default indexRouter;
