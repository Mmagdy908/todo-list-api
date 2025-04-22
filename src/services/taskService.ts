import { Task } from '../interfaces/models/task';
import { Workspace } from '../interfaces/models/workspace';
import { CreateTaskRequest, UpdateTaskRequest } from '../interfaces/requests/task';
import * as taskRepository from '../repositories/taskRepository';
import * as workspaceRepository from '../repositories/workspaceRepository';
import AppError from '../util/appError';

export const createTask = async (
  taskData: Partial<Task>
): Promise<{ newTask: Task; newWorkspace: Workspace }> => {
  const newTask = await taskRepository.create(taskData);

  // add task to list
  const newWorkspace = await workspaceRepository.addTask(newTask.workspace, newTask.id);

  if (!newWorkspace) throw new AppError(404, 'This workspace is not found');
  return { newTask, newWorkspace };
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
