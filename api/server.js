import express from 'express';
import dotenv from 'dotenv';
import prepareV1Routes from './apiVersion/v1/index.js';
dotenv.config();
const app = express();
prepareV1Routes(app);
app.use(express.json());
const port = process.env.PORT || 5000;
app.get('/', (req, res) => {
    res.send('Hello, TypeScript with Express!');
});
export default app;
