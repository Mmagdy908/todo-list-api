import JWT, { Secret, SignOptions } from 'jsonwebtoken';
import { Request, Response, NextFunction, CookieOptions } from 'express';
import redis from '../config/redis';

export const generateAccessToken = (userId: string) => {
  const secret: Secret = process.env.JWT_SECRET || '';

  const signOptions = { expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN } as SignOptions;

  return JWT.sign({ userId }, secret, signOptions);
};

export const generateRefreshToken = (userId: string, deviceId: string) => {
  const secret: Secret = process.env.JWT_SECRET || '';

  const signOptions = { expiresIn: process.env.Refresh_TOKEN_EXPIRES_IN } as SignOptions;

  return JWT.sign({ userId, deviceId }, secret, signOptions);
};

export const storeRefreshToken = async (userId: string, deviceId: string, refreshToken: string) => {
  await redis.hSet(`${userId}:${deviceId}`, { refreshToken });

  const expireAt = parseInt(process.env.Refresh_TOKEN_EXPIRES_IN?.slice(0, -1) || '30'); // in days

  await redis.expire(`${userId}:${deviceId}`, expireAt * 24 * 60 * 60);
};

export const retrieveRefreshToken = async (userId: string, deviceId: string): Promise<string> => {
  return (await redis.hGet(`${userId}:${deviceId}`, 'refreshToken')) || '';
};

export const storeRefreshTokenToCookie = async (
  res: Response,
  refreshToken: string
): Promise<void> => {
  const cookieOptions: CookieOptions = {
    httpOnly: true,
    secure: false,
    sameSite: 'strict',
    maxAge: parseInt(process.env.JWT_COOKIE_EXPIRES_IN || '30') * 24 * 60 * 60 * 1000,
  };

  if (process.env.NODE_ENV === 'production') {
    cookieOptions.secure = true;
    cookieOptions.sameSite = 'none';
  }

  res.cookie('refreshToken', refreshToken, cookieOptions);
};

const asyncJwtVerify = (token: string, secretOrPublicKey: Secret): Promise<any> => {
  return new Promise((resolve: (value: unknown) => void, reject: (reason?: any) => void) => {
    JWT.verify(token, secretOrPublicKey, function (err, payload) {
      if (err) reject(err);
      resolve(payload);
    });
  });
};

export const verifyToken = async (token: string): Promise<any> => {
  const secret: Secret = process.env.JWT_SECRET as string;
  const payload = await asyncJwtVerify(token, secret);
  return payload;
};
