
import { Router } from 'express'
import { changePassword, forgetPassword, login, resetPassword, signin } from '../controllers/authContorller';
import auth from '../middlewares/authMiddleware';

const router = Router();

router.route('/login').post(login)
router.route('/signin').post(signin)
router.route('/forgetPassword').post(forgetPassword)
router.route('/resetPassword').post(resetPassword)

//protected route
router.route('/chnagePassword').put(auth, changePassword)

export default router