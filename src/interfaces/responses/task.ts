import { Task } from '../models/task';

export interface CreateTaskResponse {
  id: string;
  title: string;
  details: string;
  status: string;
  type: string;
  subtasks: Task[];
  createdAt: Date;
  completedAt?: Date;
}

export interface UpdateTaskResponse extends CreateTaskResponse {}
