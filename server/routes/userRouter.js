const Router = require("express");
const { auth } = require("../middleware/authMiddleware");
const {
  registerUserInfo,
  updatedUserInfo,
  getUserInfo,
  getUserProject,
  getUserTask,
} = require("../controllers/userController");

const router = Router();

router
  .route("/")
  .get(auth, getUserInfo)
  .post(auth, registerUserInfo)
  .put(auth, updatedUserInfo);

router.route("/userProjects").get(auth, getUserProject);

router.route("/userTasks").get(auth, getUserTask);

module.exports = router;
