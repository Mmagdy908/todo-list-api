import { Task } from './task';

export interface Workspace {
  id: string;
  title: string;
  tasks: Task[] | string[];
  createdAt: Date;
  updatedAt: Date;
}
