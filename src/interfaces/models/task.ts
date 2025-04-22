export interface Task {
  id: string;
  title: string;
  details: string;
  status: string;
  type: string;
  subTasks: string[];
  completedAt?: Date;
  workspace: string;
  createdAt: Date;
  updatedAt: Date;
}
