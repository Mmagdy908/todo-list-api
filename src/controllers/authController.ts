import { Request, Response, NextFunction, CookieOptions } from 'express';
import { storeRefreshTokenToCookie } from '../util/authUtil';
import catchAsync from '../util/catchAsync';
import * as authService from '../services/authService';
import * as userMapper from '../mappers/userMapper';
import checkRequiredFields from '../util/checkRequiredFields';

export const register = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const body = userMapper.mapRegisterRequest(req.body);

    checkRequiredFields(body, 'firstName', 'lastName', 'email', 'password');

    const user = userMapper.mapRegisterResponse(await authService.userRegister(body));

    //TODO
    // send verification email
    res.status(201).json({ status: 'success', data: { user } });
  }
);

export const login = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const credentials = userMapper.mapLoginRequest(req.body);

    checkRequiredFields(credentials, 'email', 'password');

    const loggedUserData = await authService.userLogin(credentials);

    storeRefreshTokenToCookie(res, loggedUserData.refreshToken);

    res.status(200).json({
      status: 'success',
      data: {
        user: userMapper.mapLoginResponse(
          loggedUserData.user,
          loggedUserData.accessToken,
          loggedUserData.refreshToken
        ),
      },
    });
  }
);

export const refreshToken = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    req.body.refreshToken ||= req.cookies.refreshToken;

    checkRequiredFields(req.body, 'userId', 'refreshToken');

    const loggedUserData = await authService.refreshToken(req.body.userId, req.body.refreshToken);

    storeRefreshTokenToCookie(res, loggedUserData.refreshToken);

    res.status(200).json({
      status: 'success',
      data: {
        user: userMapper.mapLoginResponse(
          loggedUserData.user,
          loggedUserData.accessToken,
          loggedUserData.refreshToken
        ),
      },
    });
  }
);
