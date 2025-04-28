import express from 'express';
import * as workspaceController from '../controllers/workspaceController';
import * as authMiddleware from '../middlewares/authMiddleware';

const router = express.Router();

router.route('/').post(authMiddleware.protect, workspaceController.createWorkspace);

router
  .route('/:id')
  .get(
    authMiddleware.protect,
    authMiddleware.checkWorkspaceOwner,
    workspaceController.getWorkspaceById
  )
  .delete(
    authMiddleware.protect,
    authMiddleware.checkWorkspaceOwner,
    workspaceController.deleteWorkspaceById
  );

export default router;
