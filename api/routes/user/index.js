import express from 'express';
import authenticateUser from '../../middleware/authenticateUser.js';
import { activate, editPassword, editProfile, } from '../../controller/user/index.js';
const userRouter = express.Router();
userRouter.put('/', authenticateUser, editProfile);
userRouter.put('/activate', authenticateUser, activate);
userRouter.put('/editPassword', authenticateUser, editPassword);
export default userRouter;
