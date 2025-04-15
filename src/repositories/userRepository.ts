import { User } from '../interfaces/models/user';
import userModel from '../models/user';

export const create = async (userData: Partial<User>): Promise<User> => {
  return await userModel.create(userData);
};

export const getById = async (id: string): Promise<User | null> => {
  return await userModel.findById(id);
};

export const getByEmail = async (email: string): Promise<User | null> => {
  return await userModel.findOne({ email });
};
