const Router = require('express')
const { createProject, getAllProject, updateProject, deleteProject } = require('../controllers/projectController')
const { auth } = require('../middleware/authMiddleware')
const projectAuth = require('../middleware/projectAuthMiddleware')

const router = Router()

router.route('/')
    .get(auth, getAllProject)
    .post(auth, createProject)
    .put(auth, projectAuth, updateProject)
    .delete(auth, deleteProject)

module.exports = router