import express from 'express';
import {signup} from '../../controllers/auth/index.js';
import authenticateUser from '../../middleware/authenticateUser.js';

const authRouter = express.Router();

authRouter.post('/signup', authenticateUser, signup);

export default authRouter;
