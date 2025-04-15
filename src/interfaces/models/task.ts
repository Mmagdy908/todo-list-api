export interface Task {
  id: string;
  title: string;
  details: string;
  status: string;
  type: string;
  subTasks: string[];
  createdAt: Date;
  updatedAt: Date;
  completedAt: Date;
}
