import {Request, Response} from 'express';
import {
  signinSchema,
  signupSchema,
} from '../../validation/schema/auth/index.js';
import validateRequest from '../../utils/validateRequest.js';
import bcrypt from 'bcryptjs';
import {prisma} from '../../server.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const access = process.env.ACCESS_TOKEN_SECRET;
const refresh = process.env.REFRESH_TOKEN_SECRET;

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
        isActive: false,
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

export const signin = async (req: Request, res: Response): Promise<void> => {
  let response: {
    status?: number;
    message?: string | Object | Array<Object>;
  } = {};
  try {
    await validateRequest(signinSchema, req.body);
    const {email, password} = req.body;
    const user = await prisma.user.findUnique({
      where: {email: email},
    });
    if (!user) {
      response.status = 400;
      response.message = 'User not exist! use a valid email';
      res.status(response.status).json(response.message);
      return;
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      response.status = 400;
      response.message = 'Invalid credentials';
      res.status(response.status).json(response.message);
      return;
    }
    const accessToken = jwt.sign({id: user.id}, access as string, {
      expiresIn: '30s',
    });
    const refreshToken = jwt.sign({id: user.id}, refresh as string, {
      expiresIn: '12h',
    });
    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 30 * 1000,
    });
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 12 * 60 * 60 * 1000,
    });
    response.status = 200;
    response.message = {
      id: user.id,
      username: user.username,
      email: user.email,
      isActive: user.isActive,
      profileImage: user.profileImage,
      plan: user.plan,
      role: user.role,
      stripeId: user.stripeId,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      deletedAt: user.deletedAt,
    };
    res.status(response.status).json(response.message);
  } catch (err: any) {
    response.status = 400;
    response.message = err.message;
  }
  res.status(response.status).json(response.message);
};
