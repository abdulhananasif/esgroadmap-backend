import express from 'express';
import authenticateUser from '../../middleware/authenticateUser.js';
import { regenerateToken, signin, signup } from '../../controller/auth/index.js';
const authRouter = express.Router();
authRouter.post('/signup', signup);
authRouter.post('/signin', signin);
authRouter.post('/regenerateToken', authenticateUser, regenerateToken);
export default authRouter;
