import { User } from '../interfaces/models/user';
import { Workspace } from '../interfaces/models/workspace';
import * as userRepository from '../repositories/userRepository';
import * as workspaceRepository from '../repositories/workspaceRepository';
import appError from '../util/appError';

export const createWorkspace = async (
  user: User,
  workspaceData: Partial<Workspace>
): Promise<{ newWorkspace: Workspace; newUser: User }> => {
  const newWorkspace = await workspaceRepository.create(workspaceData);

  // add workspace to user
  const { workspaces } = user;
  workspaces.push(newWorkspace.id);
  const newUser = (await userRepository.updateById(user.id, { workspaces })) as User;

  return { newWorkspace, newUser };
};
