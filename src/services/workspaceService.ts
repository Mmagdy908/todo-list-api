import { Task } from '../interfaces/models/task';
import { User } from '../interfaces/models/user';
import { Workspace } from '../interfaces/models/workspace';
import user from '../models/user';
import * as userRepository from '../repositories/userRepository';
import * as workspaceRepository from '../repositories/workspaceRepository';
import * as taskService from '../services/taskService';

import AppError from '../util/appError';
import { containSameValues } from '../util/containSameValues';

export const createWorkspace = async (
  user: User,
  workspaceData: Partial<Workspace>
): Promise<{ newWorkspace: Workspace; newUser: User }> => {
  const newWorkspace = (await workspaceRepository.create(workspaceData)) as Workspace;

  // add workspace to user
  const newUser = (await userRepository.addWorkspace(user.id, newWorkspace.id)) as User;

  return { newWorkspace, newUser };
};

export const getWorkspaceById = async (id: string): Promise<Workspace> => {
  const workspace = await workspaceRepository.getById(id, {
    path: 'tasks',
    populate: 'subtasks',
  });

  if (!workspace) throw new AppError(404, 'This workspace is not found');

  return workspace;
};

export const updateWorkspace = async (
  id: string,
  newData: Partial<Workspace>
): Promise<Workspace> => {
  const workspace = await workspaceRepository.getById(id);
  if (!workspace) throw new AppError(404, 'This workspace not found');

  // check if trying to add or remove tasks
  if (newData.tasks && !containSameValues(workspace.tasks as string[], newData.tasks as string[]))
    throw new AppError(400, "Tasks can't be added or removed in this route");

  return (await workspaceRepository.updateById(id, newData)) as Workspace;
};

export const deleteWorkspaceById = async (id: string, userId: string): Promise<void> => {
  const workspace = await workspaceRepository.getById(id, { path: 'tasks' });
  if (!workspace) throw new AppError(404, 'This workspace is not found');

  // deleting tasks and subtasks
  const tasks = workspace.tasks as Task[];
  await Promise.all(tasks.map((task) => taskService.deleteTask(task)));

  // remove workspace from user
  await userRepository.removeWorkspace(id, userId);

  // deleting workspace
  await workspaceRepository.deleteById(id);
};
