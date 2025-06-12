import express from 'express';
import { createCheckout } from '../../controller/payment/index.js';
const paymentRouter = express.Router();

paymentRouter.post('/checkout', createCheckout);

export default paymentRouter;