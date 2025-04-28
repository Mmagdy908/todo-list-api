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

export const getWorkspaceById = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const workspace = await workspaceService.getWorkspaceById(req.params.id);

    res.status(200).json({
      status: 'success',
      data: { workspace: workspaceMapper.mapGetWorkspaceResponse(workspace) },
    });
  }
);

export const deleteWorkspaceById = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    await workspaceService.deleteWorkspaceById(req.params.id, req.user.id);

    res.status(204).json({ status: 'success', data: null });
  }
);
