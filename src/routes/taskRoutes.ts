import express from 'express';
import * as taskController from '../controllers/taskController';
import * as authMiddleware from '../middlewares/authMiddleware';

const router = express.Router();

router
  .route('/')
  .post(authMiddleware.protect, authMiddleware.checkWorkspaceOwner, taskController.createTask);

router
  .route('/:id')
  .patch(authMiddleware.protect, authMiddleware.checkTaskOwner, taskController.updateTask)
  .delete(authMiddleware.protect, authMiddleware.checkTaskOwner, taskController.deleteTask);

export default router;
