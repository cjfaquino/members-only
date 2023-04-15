import { Router } from 'express';
import { index } from '../controllers/messageController';
const indexRouter = Router();

/* GET home page. */
indexRouter.get('/', index);

export default indexRouter;
