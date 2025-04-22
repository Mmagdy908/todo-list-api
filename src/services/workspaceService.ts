import { User } from '../interfaces/models/user';
import { Workspace } from '../interfaces/models/workspace';
import * as userRepository from '../repositories/userRepository';
import * as workspaceRepository from '../repositories/workspaceRepository';

export const createWorkspace = async (
  user: User,
  workspaceData: Partial<Workspace>
): Promise<{ newWorkspace: Workspace; newUser: User }> => {
  const newWorkspace = (await workspaceRepository.create(workspaceData)) as Workspace;

  // add workspace to user
  const newUser = (await userRepository.addWorkspace(user.id, newWorkspace.id)) as User;

  return { newWorkspace, newUser };
};
