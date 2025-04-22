import { Request, Response, NextFunction } from 'express';
import catchAsync from '../util/catchAsync';
import checkRequiredFields from '../util/checkRequiredFields';
import * as taskMapper from '../mappers/taskMapper';
import * as taskService from '../services/taskService';

export const createTask = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const body = taskMapper.mapCreateTaskRequest(req.body);
    checkRequiredFields(body, 'title');

    const task = taskMapper.mapCreateTaskResponse(await taskService.createTask(body));

    res.status(201).json({ status: 'success', data: { task } });
  }
);

export const updateTask = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const body = taskMapper.mapUpdateTaskRequest(req.body);

    const newTask = taskMapper.mapUpdateTaskResponse(
      await taskService.updateTask(req.params.id, body)
    );

    res.status(200).json({ status: 'success', data: { task: newTask } });
  }
);
