import express from 'express';
import * as taskController from '../controllers/taskController';
import * as authMiddleware from '../middlewares/authMiddleware';

const router = express.Router();

//add auth middleware
//TODO
router.route('/').post(taskController.createTask);

export default router;
