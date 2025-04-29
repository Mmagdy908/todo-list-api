export interface CreateWorkspaceRequest {
  title: string;
}

export interface UpdateWorkspaceRequest extends CreateWorkspaceRequest {
  tasks: string[];
}
