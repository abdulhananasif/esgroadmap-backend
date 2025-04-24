import express from 'express';
import authenticateUser from '../../middleware/authenticateUser.js';
import {carbonReduction} from '../../controller/tool/index.js';

const toolRouter = express.Router();

toolRouter.get(
  '/carbonReduction',
  // authenticateUser as unknown as express.RequestHandler,
  carbonReduction as unknown as express.RequestHandler
);

export default toolRouter;
