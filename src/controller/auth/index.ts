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
    await validateRequest(signupSchema, req.body);
    const {username, email, password} = req.body;
    const existingUser = await prisma.user.findUnique({
      where: {email: email},
    });
    if (existingUser) {
      response.status = 400;
      response.message = 'User already exist use a different email';
      res.status(response.status).json(response.message);
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashPassword,
        isActive: true,
      },
    });
    response.status = 200;
    response.message = {
      id: newUser.id,
      username: newUser.username,
      email: newUser.email,
      isActive: newUser.isActive,
      profileImage: newUser.profileImage,
      plan: newUser.plan,
      role: newUser.role,
      stripeId: newUser.stripeId,
      createdAt: newUser.createdAt,
      updatedAt: newUser.updatedAt,
      deletedAt: newUser.deletedAt,
    };
  } catch (err: any) {
    response.status = 400;
    response.message = err.message;
  }
  res.status(response.status).json(response.message);
};
