const jwt = require("jsonwebtoken");
const resData = require("../utils/apiRes");
const asyncWrapper = require("../utils/asyncWrapper");
const Users = require("../models/userModels/usersModel");
const { findUser } = require("../controllers/userController");

const auth = asyncWrapper(async (req, res, next) => {
  const token = req.cookies.token;

  const { userId, email } = jwt.verify(token, process.env.JWT_SECRET_KEY);

  if (!(userId && email))
    return res.status(400).json(resData(false, "invalid auth token", null));

  const user = await findUser(email);

  if (!user)
    return res.status(401).json(resData(false, "user not found", null));

  req.userId = userId;
  req.user = user;

  next();
});

module.exports = {
  auth,
};
