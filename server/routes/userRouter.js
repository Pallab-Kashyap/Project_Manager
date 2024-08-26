const Router = require('express');
const { registerUserInfo, updatedUserInfo, getUserInfo } = require('../controllers/userController');
const { auth } = require('../middleware/authMiddleware');

const router = Router();

router.route('/')
    .get(auth, getUserInfo)
    .post(auth, registerUserInfo)
    .put(auth, updatedUserInfo)

module.exports = router