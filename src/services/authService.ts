import { v4 as uuidv4 } from 'uuid';
import {
  generateAccessToken,
  verifyToken,
  generateRefreshToken,
  storeRefreshToken,
  retrieveRefreshToken,
} from '../util/authUtil';
import { User } from '../interfaces/models/user';
import { LoginRequest } from '../interfaces/requests/user';
import * as userRepository from '../repositories/userRepository';

import AppError from '../util/appError';
export const userRegister = async (userData: Partial<User>): Promise<User> => {
  const user = await userRepository.create(userData);

  return user;
};

export const userLogin = async (
  credentials: LoginRequest
): Promise<{ user: User; accessToken: string; refreshToken: string }> => {
  const { email, password } = credentials;

  // 1) Get user by email
  const user = await userRepository.getByEmail(email);

  // 2) check email and password
  if (!user || !(await user.checkPassword(password))) {
    throw new AppError(401, 'Incorrect email or password');
  }

  // 3) generate access token
  const accessToken = generateAccessToken(user.id);

  // 4) generate refresh token
  const deviceId = uuidv4();
  const refreshToken = generateRefreshToken(user.id, deviceId);

  // 5) save refresh token to redis
  await storeRefreshToken(user.id, deviceId, refreshToken);

  return {
    user,
    accessToken,
    refreshToken,
  };
};

export const refreshToken = async (
  userId: string,
  refreshToken: string
): Promise<{ user: User; accessToken: string; refreshToken: string }> => {
  // 1) verify access token
  const payload = await verifyToken(refreshToken);

  // 2) check if refresh token exists in redis
  const retrievedRefreshToken = await retrieveRefreshToken(userId, payload.deviceId);
  if (!retrievedRefreshToken || retrievedRefreshToken !== refreshToken) {
    throw new AppError(400, 'Invalid Refresh Token');
  }

  // 3) check user id
  if (userId !== payload.userId) throw new AppError(400, 'Invalid Refresh Token');

  // 4) check if user exists
  const user = await userRepository.getById(payload.userId);
  if (!user) throw new AppError(400, 'User does not exist');

  // 5) check if user changed password after token creation
  // TODO

  // 6) generate access token
  const newAccessToken = generateAccessToken(userId);

  // 7) rotate refresh token
  const newRefreshToken = generateRefreshToken(userId, payload.deviceId);
  await storeRefreshToken(userId, payload.deviceId, newRefreshToken);

  return { user, accessToken: newAccessToken, refreshToken: newRefreshToken };
};
