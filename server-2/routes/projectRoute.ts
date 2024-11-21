
import { Router } from 'express'
import { createProject, deleteProject, getAllProjects, getProjectById, updateProject } from '../controllers/projectController';
import auth from '../middlewares/authMiddleware';

const router = Router();

router.route('/')
    .get(auth, getAllProjects)
    .post(auth, createProject)
    .put(auth, updateProject)
    .delete(auth, deleteProject)

router.route('/:projectId').get(auth, getProjectById)

export default router