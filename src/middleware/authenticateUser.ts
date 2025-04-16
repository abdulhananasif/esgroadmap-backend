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
  const {accessToken, refreshToken} = req.cookies;
  if (!accessToken || !refreshToken) {
    res.status(400).json({message: 'Authentication required'});
    return;
  }
  jwt.verify(
    accessToken,
    process.env.ACCESS_TOKEN_SECRET as string,
    (err: any, decoded: any) => {
      if (err) {
        if (err.name === 'TokenExpiredError') {
          jwt.verify(
            refreshToken,
            process.env.REFRESH_TOKEN_SECRET as string,
            (refreshErr: any, refreshDecoded: any) => {
              if (refreshErr) {
                res.status(400).json({message: 'Refresh token expired'});
                return;
              }
              const newAccessToken = jwt.sign(
                {userId: refreshDecoded.id},
                process.env.ACCESS_TOKEN_SECRET as string,
                {expiresIn: '30s'}
              );
              res.cookie('accessToken', newAccessToken, {
                httpOnly: true,
                secure: true,
                sameSite: 'strict',
                maxAge: 30 * 1000,
              });
              req.user = refreshDecoded;
              return next();
            }
          );
        } else {
          return res.status(401).json({message: 'Invalid access token'});
        }
      } else {
        req.user = decoded; // Attach decoded user data to the request
        return next();
      }
    }
  );
};

export default authenticateUser;
