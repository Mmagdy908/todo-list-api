import workspaceModel from '../models/workspace';
import { Workspace } from '../interfaces/models/workspace';

export const create = async (workspaceData: Partial<Workspace>): Promise<Workspace> => {
  return await workspaceModel.create(workspaceData);
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
