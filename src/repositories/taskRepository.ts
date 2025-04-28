import taskModel from '../models/task';
import { Task } from '../interfaces/models/task';
import { PopulateOptions } from 'mongoose';

export const create = async (taskData: Partial<Task>): Promise<Task> => {
  return await taskModel.create(taskData);
};

export const getById = async (
  id: string,
  populateOption?: PopulateOptions
): Promise<Task | null> => {
  const query = taskModel.findById(id);

  if (populateOption) query.populate(populateOption);

  return await query;
};

export const updateById = async (id: string, newData: Partial<Task>): Promise<Task | null> => {
  return await taskModel
    .findByIdAndUpdate(id, newData, { new: true, runValidators: true })
    .populate('subtasks');
};

export const deleteById = async (id: string): Promise<Task | null> => {
  return await taskModel.findByIdAndDelete(id);
};
