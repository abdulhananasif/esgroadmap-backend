import express from 'express';
import { carbonReduction } from '../../controller/tool/index.js';
const toolRouter = express.Router();
toolRouter.get('/carbonReduction', 
// authenticateUser as unknown as express.RequestHandler,
carbonReduction);
export default toolRouter;
