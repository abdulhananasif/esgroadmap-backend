import express from 'express';
import authenticateUser from '../../middleware/authenticateUser.js';
import {signin, signup} from '../../controller/auth/index.js';

const authRouter = express.Router();

authRouter.post('/signup', signup);
authRouter.post('/signin', signin);

export default authRouter;
