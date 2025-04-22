import taskModel from '../models/task';
import { Task } from '../interfaces/models/task';

export const create = async (taskData: Partial<Task>): Promise<Task> => {
  return await taskModel.create(taskData);
};

export const getById = async (id: string): Promise<Task | null> => {
  return await taskModel.findById(id);
};

export const updateById = async (id: string, newData: Partial<Task>): Promise<Task | null> => {
  return await taskModel.findByIdAndUpdate(id, newData, { new: true, runValidators: true });
};

export const deleteById = async (id: string): Promise<Task | null> => {
  return await taskModel.findByIdAndDelete(id);
};
