import express from 'express';
import authenticateUser from '../../middleware/authenticateUser.js';
import {editProfile} from '../../controller/user/index.js';

const userRouter = express.Router();

userRouter.put(
  '/',
  authenticateUser as unknown as express.RequestHandler,
  editProfile as unknown as express.RequestHandler
);

export default userRouter;
