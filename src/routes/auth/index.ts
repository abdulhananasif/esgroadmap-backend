import express from 'express';
import authenticateUser from '../../middleware/authenticateUser.js';
import {signin, signup} from '../../controller/auth/index.js';

const authRouter = express.Router();

authRouter.post('/signup', authenticateUser, signup);
authRouter.post('/signin', authenticateUser, signin);

export default authRouter;
