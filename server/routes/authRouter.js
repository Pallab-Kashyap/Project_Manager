const { registerUser } = require("../controllers/authController");
const { Router } = require('express');

const router = Router()

router.route('/signin').post(registerUser)

module.exports = router
