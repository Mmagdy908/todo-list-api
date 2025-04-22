// export interface Workspace {
//   id: string;
//   title: string;
//   tasks: string[];
//   createdAt: Date;
//   updatedAt: Date;
// }

import { User } from '../models/user';

export interface CreateWorkspaceRequest {
  title: string;
  user: User;
}
