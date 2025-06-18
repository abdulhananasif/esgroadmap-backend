import express from 'express';
import { products } from '../../controller/payment/index.js';
const paymentRouter = express.Router();
paymentRouter.get('/products', products);
export default paymentRouter;
