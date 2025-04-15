import { Task } from '../interfaces/models/task';
import { CreateTaskRequest } from '../interfaces/requests/task';
import { CreateTaskResponse } from '../interfaces/responses/task';

export const mapCreateTaskRequest = (taskData: Task): CreateTaskRequest => {
  const { title, details, type } = taskData;

  return { title, details, type };
};

export const mapCreateTaskResponse = (taskData: Task): CreateTaskResponse => {
  const { id, title, details, status, type, subTasks, createdAt, completedAt } = taskData;

  return { id, title, details, status, type, subTasks, createdAt, completedAt };
};
