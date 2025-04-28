import { Task } from '../models/task';

export interface CreateWorkspaceResponse {
  id: string;
  title: string;
  tasks: string[];
  createdAt: Date;
}

export interface GetWorkspaceResponse {
  id: string;
  title: string;
  tasks: Task[];
  createdAt: Date;
}
