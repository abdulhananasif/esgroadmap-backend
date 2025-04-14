import express from 'express';
import authenticateUser from '../../middleware/authenticateUser';
import {signup} from '../../controller/auth';

const authRouter = express.Router();

authRouter.post('/signup', authenticateUser, signup);

export default authRouter;
