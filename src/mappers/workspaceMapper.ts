import { Task } from '../interfaces/models/task';
import { Workspace } from '../interfaces/models/workspace';
import { CreateWorkspaceRequest } from '../interfaces/requests/workspace';
import { CreateWorkspaceResponse, GetWorkspaceResponse } from '../interfaces/responses/workspace';
import * as taskMapper from './taskMapper';

export const mapCreateWorkspaceRequest = (
  WorkspaceData: CreateWorkspaceRequest
): CreateWorkspaceRequest => {
  const { title } = WorkspaceData;

  return { title };
};

export const mapCreateWorkspaceResponse = (workspace: Workspace): CreateWorkspaceResponse => {
  const { id, title, createdAt } = workspace;
  const workspaceTasks = workspace.tasks as string[];
  return { id, title, tasks: workspaceTasks, createdAt };
};

export const mapGetWorkspaceResponse = (workspace: Workspace): GetWorkspaceResponse => {
  const { id, title, createdAt } = workspace;
  const workspaceTasks = workspace.tasks as Task[];
  const tasks = workspaceTasks.map((task) => taskMapper.mapGetTaskResponse(task)) as Task[];
  return { id, title, tasks, createdAt };
};
