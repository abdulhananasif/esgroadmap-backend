import {Request, Response, NextFunction} from 'express';

const authenticateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  next();
};

export default authenticateUser;
