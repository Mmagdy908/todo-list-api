import { User } from '../interfaces/models/user';
import { RegisterRequest, LoginRequest } from '../interfaces/requests/user';
import { RegisterResponse, LoginResponse } from '../interfaces/responses/user';

export const mapRegisterRequest = (userData: User): RegisterRequest => {
  const { firstName, lastName, email, password } = userData;

  return { firstName, lastName, email, password };
};

export const mapRegisterResponse = (userData: User): RegisterResponse => {
  const { id, firstName, lastName, fullName, email, createdAt } = userData;

  return { id, firstName, lastName, fullName, email, createdAt };
};

export const mapLoginRequest = (userData: User): LoginRequest => {
  const { email, password } = userData;

  return { email, password };
};

export const mapLoginResponse = (
  userData: User,
  accessToken: string,
  refreshToken: string
): LoginResponse => {
  const { id, firstName, lastName, fullName, email, createdAt } = userData;

  return { id, firstName, lastName, fullName, email, accessToken, refreshToken, createdAt };
};

// export const mapRefreshTokenRequest = (userData: {
//   userId: string;
//   refreshToken: string;
// }): RefreshTokenRequest => {
//   const { userId, refreshToken } = userData;
//   return { userId, refreshToken };
// };
