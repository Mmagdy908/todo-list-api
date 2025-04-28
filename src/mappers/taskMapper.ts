import { Task } from '../interfaces/models/task';
import {
  CreateTaskRequest,
  CreateSubtaskRequest,
  UpdateTaskRequest,
} from '../interfaces/requests/task';
import { CreateTaskResponse, UpdateTaskResponse } from '../interfaces/responses/task';

export const mapCreateTaskRequest = (taskData: Task): CreateTaskRequest => {
  const { title, details, workspace } = taskData;

  return { title, details, workspace };
};

export const mapCreateSubtaskRequest = (subtaskData: Task): CreateSubtaskRequest => {
  const { title, workspace } = subtaskData;

  return { title, workspace };
};

export const mapCreateTaskResponse = (task: Task): CreateTaskResponse => {
  const { id, title, details, status, type, createdAt, completedAt } = task;
  const subtasks = task.subtasks as Task[];
  return { id, title, details, status, type, subtasks, createdAt, completedAt };
};

export const mapUpdateTaskRequest = (newTaskData: Task): UpdateTaskRequest => {
  const { title, details, status } = newTaskData;

  const subtasks = newTaskData.subtasks as Task[];

  return { title, details, status, subtasks };
};

export const mapUpdateTaskResponse = (task: Task): UpdateTaskResponse => {
  const { id, title, details, status, type, createdAt, completedAt } = task;

  const taskSubtasks = task.subtasks as Task[];

  const subtasks = taskSubtasks.map((subtask: Task) => {
    const { id, title, status, type, completedAt, createdAt } = subtask;
    return { id, title, status, type, completedAt, createdAt };
  }) as Task[];

  return { id, title, details, status, type, subtasks, createdAt, completedAt };
};

export const mapGetTaskResponse = mapUpdateTaskResponse;
