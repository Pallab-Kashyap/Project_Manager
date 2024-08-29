const Router = require("express");
const {
  getUserTask,
  getProjectTask,
  createTask,
  updateTask,
  deleteTask,
} = require("../controllers/taskController");
const { auth } = require("../middleware/authMiddleware");
const taskAuth = require("../middleware/taskAuthMIddleware");


const router = Router();

router
  .route("/")
  .get(auth, getProjectTask)
  .post(auth, createTask)
  .put(auth, taskAuth, updateTask)
  .delete(auth, deleteTask);

module.exports = router;
