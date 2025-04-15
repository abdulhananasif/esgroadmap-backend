import {Application} from 'express';
import authRouter from '../../routes/auth/index.js';

const prepareV1Routes = (app: Application) => {
  const prefix = '/api/v1/';

  app.use(`${prefix}auth`, authRouter);
};

export default prepareV1Routes;
