import express from 'express';
import * as workspaceController from '../controllers/workspaceController';
import * as authMiddleware from '../middlewares/authMiddleware';

const router = express.Router();

router.route('/').post(authMiddleware.protect, workspaceController.createWorkspace);

export default router;
