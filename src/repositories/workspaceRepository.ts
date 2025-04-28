import workspaceModel from '../models/workspace';
import { Workspace } from '../interfaces/models/workspace';
import { PopulateOptions } from 'mongoose';

export const create = async (workspaceData: Partial<Workspace>): Promise<Workspace> => {
  return await workspaceModel.create(workspaceData);
};

export const getById = async (
  id: string,
  populateOption?: PopulateOptions
): Promise<Workspace | null> => {
  const query = workspaceModel.findById(id);

  if (populateOption) query.populate(populateOption);

  return await query;
};

export const updateById = async (
  id: string,
  newworkspaceData: Partial<Workspace>
): Promise<Workspace | null> => {
  return await workspaceModel.findByIdAndUpdate(id, newworkspaceData, { new: true });
};

export const addTask = async (id: string, taskId: string): Promise<Workspace | null> => {
  return await workspaceModel.findByIdAndUpdate(id, { $push: { tasks: taskId } }, { new: true });
};

export const removeTask = async (id: string, taskId: string): Promise<Workspace | null> => {
  return await workspaceModel.findByIdAndUpdate(id, { $pull: { tasks: taskId } }, { new: true });
};
