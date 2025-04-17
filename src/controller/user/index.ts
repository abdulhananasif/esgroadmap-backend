import {Response} from 'express';
import {AuthenticatedRequest} from '../../types/request.js';
import validateRequest from '../../utils/validateRequest.js';
import {editProfileSchema} from '../../validation/schema/user/index.js';
import {prisma} from '../../server.js';

export const editProfile = async (req: AuthenticatedRequest, res: Response) => {
  const {id} = req.user;
  let response: {
    status?: number;
    message?: string | Object | Array<Object>;
  } = {};
  try {
    await validateRequest(editProfileSchema, req.body);
    const {username, email} = req.body;
    const user = await prisma.user.update({
      where: {
        id,
      },
      data: {
        username,
        email,
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

export const activate = async (req: AuthenticatedRequest, res: Response) => {
  const {id} = req.user;
  let response: {
    status?: number;
    message?: string | Object | Array<Object>;
  } = {};
  try {
    await prisma.user.update({where: {id}, data: {isActive: true}});
    response.status = 200;
    response.message = 'success';
  } catch (err: any) {
    response.status = 400;
    response.message = err.message;
  }
  res.status(response.status).json(response.message);
};
