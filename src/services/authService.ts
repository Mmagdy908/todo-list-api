import { User } from '../interfaces/models/user';
import { LoginRequest } from '../interfaces/requests/user';
import * as userRepository from '../repositories/userRepository';
import JWT, { Secret, SignOptions } from 'jsonwebtoken';

import AppError from '../util/appError';
export const userRegister = async (userData: Partial<User>): Promise<User> => {
  const user = await userRepository.create(userData);

  if (!user) throw new Error("user can't be created");

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

  // 3) generate jwt
  const secret: Secret = process.env.JWT_SECRET || '';

  const accessToken = await JWT.sign({ id: user.id }, secret, { expiresIn: '10m' });
  const refreshToken = await JWT.sign({ id: user.id }, secret, { expiresIn: '60d' });

  return {
    user,
    accessToken,
    refreshToken,
  };
};
