// export interface Workspace {
//   id: string;
//   title: string;
//   tasks: string[];
//   createdAt: Date;
//   updatedAt: Date;
// }

export interface CreateWorkspaceRequest {
  title: string;
}

export interface UpdateWorkspaceRequest extends CreateWorkspaceRequest {
  tasks: string[];
}
