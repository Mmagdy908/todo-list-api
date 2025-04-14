import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../util/authUtil';
import * as userRepository from '../repositories/userRepository';
import catchAsync from '../util/catchAsync';
import AppError from '../util/appError';

export const protect = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    // 1) get access token
    if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer'))
      return next(new AppError(401, 'You are not logged in'));

    const accessToken = req.headers.authorization?.split(' ')[1] as string;

    // 2) verify access token

    const payload = await verifyToken(accessToken);
    console.log(payload);

    // 3) check if user exists
    const user = await userRepository.getById(payload.userId);
    if (!user) return next(new AppError(401, 'User does not exist'));

    // 4) check if user changed password after token creation
    // TODO

    req.user = user;

    next();
  }
);
