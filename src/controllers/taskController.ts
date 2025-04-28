import { Request, Response, NextFunction } from 'express';
import catchAsync from '../util/catchAsync';
import checkRequiredFields from '../util/checkRequiredFields';
import * as workspaceMapper from '../mappers/workspaceMapper';
import * as taskMapper from '../mappers/taskMapper';
import * as taskService from '../services/taskService';
import { Task } from '../interfaces/models/task';

export const createTask = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const body = taskMapper.mapCreateTaskRequest(req.body);
    checkRequiredFields(body, 'title', 'workspace');

    const { newTask, updatedWorkspace } = await taskService.createTask(body);
    res.status(201).json({
      status: 'success',
      data: { task: taskMapper.mapCreateTaskResponse(newTask) },
      workspace: workspaceMapper.mapCreateWorkspaceResponse(updatedWorkspace),
    });
  }
);

export const getTaskById = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const task = await taskService.getTaskById(req.params.id);

    res.status(200).json({
      status: 'success',
      data: { task: taskMapper.mapGetTaskResponse(task) },
    });
  }
);

export const addSubtask = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const body = taskMapper.mapCreateSubtaskRequest(req.body);

    checkRequiredFields(body, 'title');

    body.workspace = req.task?.workspace as string;

    const updatedTask = taskMapper.mapUpdateTaskResponse(
      await taskService.addSubtask(req.task as Task, body)
    );

    res.status(200).json({ status: 'success', data: { task: updatedTask } });
  }
);

export const updateTask = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const body = taskMapper.mapUpdateTaskRequest(req.body);

    const updatedTask = taskMapper.mapUpdateTaskResponse(
      await taskService.updateTask(req.params.id, body)
    );

    res.status(200).json({ status: 'success', data: { task: updatedTask } });
  }
);

export const deleteTask = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    await taskService.deleteTask(req.task as Task);

    res.status(204).json({ status: 'success', data: null });
  }
);

// export const deleteSubtask = catchAsync(
//   async (req: Request, res: Response, next: NextFunction): Promise<void> => {
//     await taskService.deleteTask(req.params.id);

//     res.status(204).json({ status: 'success', data: null });
//   }
// );
