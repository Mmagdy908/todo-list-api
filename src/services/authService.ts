import { User } from '../interfaces/models/user';
import * as userRepository from '../repositories/userRepository';

export const userRegister = async (userData: Partial<User>): Promise<User> => {
  const user = await userRepository.create(userData);

  if (!user) throw new Error("user can't be created");

  return user;
};

export const userLogin = () => {};
