import { Task } from '../interfaces/models/task';
import { CreateTaskRequest, UpdateTaskRequest } from '../interfaces/requests/task';
import { CreateTaskResponse, UpdateTaskResponse } from '../interfaces/responses/task';

export const mapCreateTaskRequest = (taskData: Task): CreateTaskRequest => {
  const { title, details, type } = taskData;

  return { title, details, type };
};

export const mapCreateTaskResponse = (task: Task): CreateTaskResponse => {
  const { id, title, details, status, type, subTasks, createdAt, completedAt } = task;

  return { id, title, details, status, type, subTasks, createdAt, completedAt };
};

export const mapUpdateTaskRequest = (newTaskData: Task): UpdateTaskRequest => {
  const { title, details, status, subTasks } = newTaskData;

  return { title, details, status, subTasks };
};

export const mapUpdateTaskResponse = mapCreateTaskResponse;
