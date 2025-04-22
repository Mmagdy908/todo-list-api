export interface CreateTaskResponse {
  id: string;
  title: string;
  details: string;
  status: string;
  type: string;
  subTasks: string[];
  createdAt: Date;
  completedAt?: Date;
}

export interface UpdateTaskResponse extends CreateTaskResponse {}
