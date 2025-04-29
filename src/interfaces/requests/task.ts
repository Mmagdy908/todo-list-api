export interface CreateTaskRequest {
  title: string;
  details: string;
  workspace: string;
}
export interface CreateSubtaskRequest {
  title: string;
  workspace: string;
}

export interface UpdateTaskRequest {
  title: string;
  details: string;
  status: string;
  subtasks: string[];
}
