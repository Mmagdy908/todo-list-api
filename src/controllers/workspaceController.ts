import { Request, Response, NextFunction } from 'express';
import catchAsync from '../util/catchAsync';
import checkRequiredFields from '../util/checkRequiredFields';
import * as userMapper from '../mappers/userMapper';
import * as workspaceMapper from '../mappers/workspaceMapper';
import * as workspaceService from '../services/workspaceService';

export const createWorkspace = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const loggedUser = req.user;
    const body = workspaceMapper.mapCreateWorkspaceRequest(req.body);
    checkRequiredFields(body, 'title');

    const { newWorkspace, newUser } = await workspaceService.createWorkspace(loggedUser, body);

    res.status(201).json({
      status: 'success',
      data: {
        workspace: workspaceMapper.mapCreateWorkspaceResponse(newWorkspace),
        user: userMapper.mapUpdateUserResponse(
          newUser,
          loggedUser.accessToken,
          loggedUser.refreshToken
        ),
      },
    });
  }
);
