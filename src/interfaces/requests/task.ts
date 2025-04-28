// export interface Task {
//   id: string;
//   title: string;
//   details: string;
//   status: string;
//   type: string;
//   subTasks: string[];
//   createdAt: Date;
//   updatedAt: Date;
//   completedAt: Date;
// }

import { Task } from '../models/task';

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
  subtasks: Task[];
}
