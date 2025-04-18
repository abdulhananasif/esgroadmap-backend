import authRouter from '../../routes/auth/index.js';
import userRouter from '../../routes/user/index.js';
const prepareV1Routes = (app) => {
    const prefix = '/api/v1/';
    app.use(`${prefix}auth`, authRouter);
    app.use(`${prefix}user`, userRouter);
};
export default prepareV1Routes;
