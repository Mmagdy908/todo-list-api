import { Request, Response, NextFunction } from 'express';
import catchAsync from '../util/catchAsync';
import checkRequiredFields from '../util/checkRequiredFields';
import * as workspaceMapper from '../mappers/workspaceMapper';
import * as taskMapper from '../mappers/taskMapper';
import * as taskService from '../services/taskService';

export const createTask = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const body = taskMapper.mapCreateTaskRequest(req.body);
    checkRequiredFields(body, 'title', 'workspace');

    const { newTask, newWorkspace } = await taskService.createTask(body);
    res
      .status(201)
      .json({
        status: 'success',
        data: { task: taskMapper.mapCreateTaskResponse(newTask) },
        workspace: workspaceMapper.mapCreateWorkspaceResponse(newWorkspace),
      });
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
    await taskService.deleteTask(req.params.id);

    res.status(204).json({ status: 'success', data: null });
  }
);
