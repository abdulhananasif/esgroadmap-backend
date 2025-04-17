import {Request, Response, NextFunction} from 'express';
import jwt from 'jsonwebtoken';
interface AuthenticatedRequest extends Request {
  user?: any;
}

const authenticateUser = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const {accessToken} = req.cookies;
  if (!accessToken) {
    res.status(400).json({message: 'Authentication required'});
    return;
  }
  jwt.verify(
    accessToken,
    process.env.ACCESS_TOKEN_SECRET as string,
    (err: any, decoded: any) => {
      if (err) {
        res.status(400).json({message: 'Access token is expired'});
      }
      req.user = decoded;
      next();
    }
  );
};

export default authenticateUser;
