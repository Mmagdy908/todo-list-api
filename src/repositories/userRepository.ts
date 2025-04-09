import { User } from '../interfaces/models/user';
import userModel from '../models/user';

export const create = async (userData: Partial<User>): Promise<User | null> => {
  return await userModel.create(userData);
};
