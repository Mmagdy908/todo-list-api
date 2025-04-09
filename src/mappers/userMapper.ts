import { User } from '../interfaces/models/user';
import { RegisterRequest } from '../interfaces/requests/user';
import { RegisterResponse } from '../interfaces/responses/user';

export const mapRegisterRequest = (userData: Partial<User>): RegisterRequest => {
  const { firstName, lastName, email, password } = userData;

  return { firstName, lastName, email, password };
};

export const mapRegisterResponse = (userData: Partial<User>): RegisterResponse => {
  const { id, firstName, lastName, fullName, email, createdAt } = userData;

  return { id, firstName, lastName, fullName, email, createdAt };
};
