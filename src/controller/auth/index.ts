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
      throw {message: 'User already exist use a different email'};
    }
    const hashedPassword = await hashPassword(password);
    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
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
      throw {message: 'User not exist! use a valid email'};
    }
    const isMatch = comparePasswords(password, user.password);
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

export const regenerateToken = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  const {accessToken, refreshToken} = req.cookies;
  if (!refreshToken) {
    res.status(400).json('Refresh token is missing');
  }
  try {
    const accessDecoded = await new Promise((resolve, reject) => {
      jwt.verify(accessToken, access as string, (err: any, decoded: any) => {
        if (!err) {
          reject(new Error('Access token is still valid'));
        } else if (err.name !== 'TokenExpiredError') {
          reject(new Error('Invalid access token'));
        } else {
          resolve(decoded);
        }
      });
    });
  } catch (error: any) {
    if (error.message === 'Access token is still valid') {
      res.status(400).json(error.message);
    }
    try {
      const refreshDecoded = await new Promise<any>((resolve, reject) => {
        jwt.verify(
          refreshToken,
          refresh as string,
          (err: any, decoded: any) => {
            if (err) {
              reject(new Error('Refresh token is invalid or expired'));
            } else {
              resolve(decoded);
            }
          }
        );
      });
      const newAccessToken = generateAccessToken(refreshDecoded.id);
      const newRefreshToken = generateAccessToken(refreshDecoded.id);
      setAuthCookies(res, newAccessToken, newRefreshToken);
      res.status(200).json('Access and Refresh token re-generated');
    } catch (refreshError: any) {
      res.status(400).json(refreshError.message);
    }
  }
};
