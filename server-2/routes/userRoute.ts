import { Router } from 'express'
import auth from '../middlewares/authMiddleware';
import { fetchUser } from '../controllers/userController';

const router = Router();

router.route('/')
    .get(auth, fetchUser)

    export default router