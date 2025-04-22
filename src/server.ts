import express, {Request, Response} from 'express';
import dotenv from 'dotenv';
import prepareV1Routes from './apiVersion/v1/index.js';
import {PrismaClient} from './generated/prisma/index.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import {sendEmail} from './utils/email.js';

export const prisma = new PrismaClient();

dotenv.config();
const app = express();
app.use(express.json());
app.use(cookieParser());

const allowedorigins = [
  'https://esgroadmap-frontend.vercel.app',
  'http://localhost:5173',
];
app.use(
  cors({
    origin: allowedorigins,
    methods: 'GET,PUT,POST,DELETE,PATCH',
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,
  })
);

prepareV1Routes(app);

sendEmail('', 'TEST ESG', 'This is a test email from ESGROADMAP');
app.get('/', (req: Request, res: Response) => {
  res.send('Hello, TypeScript with Express!');
});

export default app;
