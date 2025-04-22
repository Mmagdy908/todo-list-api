import { Workspace } from '../interfaces/models/workspace';
import { CreateWorkspaceRequest } from '../interfaces/requests/workspace';
import { CreateWorkspaceResponse } from '../interfaces/responses/workspace';

export const mapCreateWorkspaceRequest = (
  WorkspaceData: CreateWorkspaceRequest
): CreateWorkspaceRequest => {
  const { title, user } = WorkspaceData;

  return { title, user };
};

export const mapCreateWorkspaceResponse = (Workspace: Workspace): CreateWorkspaceResponse => {
  const { id, title, tasks, createdAt } = Workspace;

  return { id, title, tasks, createdAt };
};
