import {Request, Response} from 'express';
import {signupSchema} from '../../validation/schema/auth/index.js';
import validateRequest from '../../utils/validateRequest.js';
import bcrypt from 'bcryptjs';
import {prisma} from '../../server.js';

type Object = Record<string, any>;

export const signup = async (req: Request, res: Response): Promise<void> => {
  let response: {
    status?: number;
    message?: string | Object | Array<Object>;
  } = {};
  try {
    // await validateRequest(signupSchema, req.body);

    const {username, email, password} = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        username: username,
      },
    });
    response.status = 200;
    response.message = user;
  } catch (err: any) {
    response.status = 400;
    response.message = err.message;
  }
  res.status(response.status).json(response.message);
};
