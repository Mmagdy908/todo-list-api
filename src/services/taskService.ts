import { Task } from '../interfaces/models/task';
import { CreateTaskRequest } from '../interfaces/requests/task';
import * as taskRepository from '../repositories/taskRepository';

export const createTask = async (taskData: CreateTaskRequest): Promise<Task> => {
  const task = await taskRepository.create(taskData);

  // add task to list
  //TODO

  return task;
};
