import { Task } from '../interfaces/models/task';
import { CreateTaskRequest, UpdateTaskRequest } from '../interfaces/requests/task';
import * as taskRepository from '../repositories/taskRepository';
import AppError from '../util/appError';

export const createTask = async (taskData: Partial<Task>): Promise<Task> => {
  const task = await taskRepository.create(taskData);

  // add task to list
  //TODO

  return task;
};

export const updateTask = async (id: string, newData: Partial<Task>): Promise<Task> => {
  const task = await taskRepository.updateById(id, newData);
  if (!task) throw new AppError(404, 'Task not found');

  return task;
};

export const deleteTask = async (id: string): Promise<void> => {
  const task = await taskRepository.deleteById(id);

  if (!task) throw new AppError(404, 'Task not found');
};
