
import { Router } from 'express'
import { createTask, deleteTask, getAllTasks, getTaskById, updateTask } from '../controllers/taskController';
import auth from '../middlewares/authMiddleware';

const router = Router();

router.route('/')
    .get(auth, getAllTasks)
    .post(auth, createTask)
    .put(auth, updateTask)
    .delete(auth, deleteTask)

router.route('/:taskId').get(auth, getTaskById)

export default router