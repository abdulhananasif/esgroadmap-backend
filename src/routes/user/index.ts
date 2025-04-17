import express from 'express';
import authenticateUser from '../../middleware/authenticateUser.js';
import {activate, editProfile} from '../../controller/user/index.js';

const userRouter = express.Router();

userRouter.put(
  '/',
  authenticateUser as unknown as express.RequestHandler,
  editProfile as unknown as express.RequestHandler
);
userRouter.put(
  '/activate',
  authenticateUser as unknown as express.RequestHandler,
  activate as unknown as express.RequestHandler
);

export default userRouter;
