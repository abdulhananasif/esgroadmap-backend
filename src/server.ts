import express, {Request, Response} from 'express';
import dotenv from 'dotenv';
import prepareV1Routes from './apiVersion/v1/index.js';
import {PrismaClient} from './generated/prisma/index.js';
import cookieParser from 'cookie-parser';

export const prisma = new PrismaClient();

dotenv.config();
const app = express();
app.use(express.json());
app.use(cookieParser());

prepareV1Routes(app);

const port = process.env.PORT || 5000;

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, TypeScript with Express!');
});

export default app;
