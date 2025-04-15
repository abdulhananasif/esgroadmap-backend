import express from 'express';
import authenticateUser from '../../middleware/authenticateUser.js';
import {signup} from '../../controller/auth/index.js';

const authRouter = express.Router();

authRouter.post('/signup', authenticateUser, signup);

export default authRouter;
