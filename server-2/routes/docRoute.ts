import { Router } from 'express'
import { changePassword, forgetPassword, login, resetPassword, signin } from '../controllers/authContorller';
import auth from '../middlewares/authMiddleware';
import uploadDocMulter from '../middlewares/uploadDocMiddleware';
import { uploadDocument } from '../controllers/docController';

const router = Router();

router.route('/')
    .post(auth, uploadDocMulter.single('file'), uploadDocument)

export default router