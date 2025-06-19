import {Request, Response} from 'express';
import {
  signinSchema,
  signupSchema,
} from '../../validation/schema/auth/index.js';
import validateRequest from '../../utils/validateRequest.js';
import {prisma} from '../../server.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import {AuthenticatedRequest} from '../../types/request.js';
import {
  generateAccessToken,
  generateRefreshToken,
  setAuthCookies,
} from '../../utils/token.js';
import {comparePasswords, hashPassword} from '../../utils/password.js';
import {emailContent} from '../../utils/emailContent.js';
import { sendEmail } from '../../utils/email.js';

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
    const {username, email, password, planId, planName} = req.body;
    const existingUser = await prisma.user.findFirst({
      where: {email: email},
    });
    if (existingUser) {
      throw {message: 'User already exist use a different email'};
    }
    const hashedPassword = await hashPassword(password);
    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
        isActive: false,
        planId,
        planName,
        emailUpdate: `${Date.now()}`,
      },
    });
    // await sendEmail(email , "Account activation mail:" , emailContent )

    response.status = 200;
    response.message = {
      Message: 'Signup successful, Check your email account activation',
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
    const user = await prisma.user.findFirst({
      where: {email},
    });
    if (!user) {
      throw {message: 'User not exist! use a valid email'};
    }
    const isMatch = await comparePasswords(password, user.password);
    if (!isMatch) {
      throw {message: 'Invalid credentials'};
    }
    const accessToken = generateAccessToken(user.id);
    const refreshToken = generateRefreshToken(user.id);
    setAuthCookies(res, accessToken, refreshToken);
    response.status = 200;
    response.message = {
      id: user.id,
      username: user.username,
      email: user.email,
      isActive: user.isActive,
      profileImage: user.profileImage,
      plan: user.plan,
      role: user.role,
      planId: user.planId,
      planName: user.planName,
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
};

export const regenerateToken = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  const { accessToken, refreshToken } = req.cookies;
  if (!refreshToken) {
    console.log('Refresh token missing');
    res.status(400).json({ message: 'Refresh token is missing' });
    return;
  }
  try {
    jwt.verify(accessToken, access as string);
    res.status(200).json({ message: 'Access token is still valid' });
    return;
  } catch (accessErr: any) {
    try {
      const decodedRefresh = jwt.verify(refreshToken, refresh as string) as any;
      const newAccessToken = generateAccessToken(decodedRefresh.id);
      const newRefreshToken = generateRefreshToken(decodedRefresh.id);
      setAuthCookies(res, newAccessToken, newRefreshToken);
      console.log('New tokens generated');
      res.status(200).json({ message: 'Access and Refresh tokens are re-generated' });
      return;
    } catch (refreshErr: any) {
      console.error('Invalid or expired refresh token:', refreshErr.message);
      res.status(401).json({ message: 'Refresh token is invalid or expired' });
      return;
    }
    }
    
  };


