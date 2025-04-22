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

export interface CreateTaskRequest {
  title: string;
  details: string;
  type: string;
}

export interface UpdateTaskRequest {
  title: string;
  details: string;
  status: string;
  subTasks: string[];
}
