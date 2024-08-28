const Router = require('express')
const { createProject, getAllProject, updateProject, deleteProject } = require('../controllers/projectController')
const { auth } = require('../middleware/authMiddleware')
const checkAuthorization = require('../middleware/checkAthorizationMiddleware')

const router = Router()

router.route('/')
    .get(auth, getAllProject)
    .post(auth, createProject)
    .put(auth, checkAuthorization, updateProject)
    .delete(auth, deleteProject)

module.exports = router