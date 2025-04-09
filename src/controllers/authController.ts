import { Request, Response, NextFunction } from 'express';
import catchAsync from '../util/catchAsync';
import * as authService from '../services/authService';
import * as userMapper from '../mappers/userMapper';
import checkRequiredFields from '../util/checkRequiredFields';

export const register = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const body = userMapper.mapRegisterRequest(req.body);

    checkRequiredFields(body, 'firstName', 'lastName', 'email', 'password');

    const user = userMapper.mapRegisterResponse(await authService.userRegister(body));

    res.status(201).json({ status: 'success', data: { user } });
  }
);
