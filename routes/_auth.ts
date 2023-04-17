import { Router } from 'express';
import {
  auth_member_get,
  auth_member_post,
  auth_admin_get,
  auth_admin_post,
} from '../controllers/authController';
import requireLogin from '../middlewares/requireLogin';

const authRouter = Router();

// GET Member form
authRouter.get('/member', auth_member_get);

// POST Member form
authRouter.post('/member', auth_member_post);

// GET Admin form
authRouter.get('/admin', auth_admin_get);

// POST Admin form
authRouter.post('/admin', auth_admin_post);

export default authRouter;
