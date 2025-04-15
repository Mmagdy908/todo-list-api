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
