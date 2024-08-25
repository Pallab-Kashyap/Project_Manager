const { registerUser, loginUser } = require("../controllers/authController");
const { Router } = require('express');

const router = Router()

router.route('/signin').post(registerUser)
router.route('/login').post(loginUser)


module.exports = router
