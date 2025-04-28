import { Task } from '../interfaces/models/task';
import { Workspace } from '../interfaces/models/workspace';
import { CreateTaskRequest, UpdateTaskRequest } from '../interfaces/requests/task';
import * as taskRepository from '../repositories/taskRepository';
import * as workspaceRepository from '../repositories/workspaceRepository';
import AppError from '../util/appError';
import { containSameValues } from '../util/containSameValues';

export const createTask = async (
  taskData: Partial<Task>
): Promise<{ newTask: Task; updatedWorkspace: Workspace }> => {
  const newTask = await taskRepository.create(taskData);

  // add task to list
  const updatedWorkspace = await workspaceRepository.addTask(newTask.workspace, newTask.id);

  if (!updatedWorkspace) throw new AppError(404, 'This workspace is not found');
  return { newTask, updatedWorkspace };
};

export const getTaskById = async (id: string): Promise<Task> => {
  // check for existence is present in checkTaskOwner middleware
  const task = (await taskRepository.getById(id, { path: 'subtasks' })) as Task;

  return task;
};

export const addSubtask = async (task: Task, subtaskData: Partial<Task>): Promise<Task> => {
  // create subtask
  subtaskData.type = 'Subtask';
  const newSubtask = await taskRepository.create(subtaskData);

  // add to parent task
  const taskSubtasks = task.subtasks as string[];
  taskSubtasks.push(newSubtask.id);

  const newTask = (await taskRepository.updateById(task.id, { subtasks: taskSubtasks })) as Task;

  return newTask;
};

export const updateTask = async (id: string, newData: Partial<Task>): Promise<Task> => {
  const task = await taskRepository.getById(id);
  if (!task) throw new AppError(404, 'Task not found');

  // check if trying to add or remove subtasks
  if (
    newData.subtasks &&
    !containSameValues(newData.subtasks as string[], task.subtasks as string[])
  )
    throw new AppError(400, "Subtasks can't be added or removed in this route");

  return (await taskRepository.updateById(id, newData)) as Task;
};

export const deleteTask = async (task: Task): Promise<void> => {
  const subtasks = task.subtasks as string[];

  // deleting subtasks
  await Promise.all(subtasks.map((subtask: string) => taskRepository.deleteById(subtask)));

  // delete task from workspace
  if (task.type === 'Task') await workspaceRepository.removeTask(task.workspace, task.id);

  // deleting task
  await taskRepository.deleteById(task.id);
};
