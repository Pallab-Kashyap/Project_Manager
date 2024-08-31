const resData = require("../utils/apiRes");
const { sequelize } = require("../config/db");
const asyncWrapper = require("../utils/asyncWrapper");

const { User, UserInfo, StudentInfo, CompanyInfo, Project, Task, TaskMember } = require('../models')

const findUser = async (email) => {

  let user = await User.findOne({
    where: { email: email },
    attributes: { exclude: ["createdAt", "updatedAt"] },
  });

  if (user) user = user.toJSON();
  return user;
};

const registerStudentInfo = async (req, res, next) => {
  const transaction = await sequelize.transaction();
  const userId = req.userId;

  try {
    const { occupation, instituteName, stream, year, domain, state, country } =
      req.body;

    if (!(instituteName && stream && year && domain && state && country))
      return res.status(400).json(resData(false, "all fields required", null));

    const userInfo = await UserInfo.create(
      {
        userId,
        occupation,
      },
      { transaction }
    );

    const userInfoId = await userInfo.toJSON().id;

    console.log("userinfoid", userInfoId);

    let result = await StudentInfo.create(
      {
        userInfoId,
        instituteName,
        stream,
        year,
        domain,
        state,
        country,
      },
      { transaction }
    );

    result = result.toJSON();

    await transaction.commit();
    res.status(201).json(resData(true, "success", result));
  } catch (err) {
    await transaction.rollback();
    return res
      .status(500)
      .json(resData(false, "user_info already exits", null));
  }
};

const registerCompanyInfo = async (req, res, next) => {
  const transaction = await sequelize.transaction();
  const userId = req.userId;

  try {
    const {
      occupation,
      companyName,
      companySize,
      sector,
      website,
      state,
      country,
    } = req.body;

    if (!(companyName && companySize && sector && state && country))
      return res.status(400).json(resData(false, "all fields required", null));

    const userInfo = await UserInfo.create(
      {
        userId,
        occupation,
      },
      { transaction }
    );

    const userInfoId = await userInfo.toJSON().id;
    console.log("com");
    let result = await CompanyInfo.create(
      {
        userInfoId,
        companyName,
        companySize,
        sector,
        website,
        state,
        country,
      },
      { transaction }
    );

    result = result.toJSON();

    await transaction.commit();
    res.status(201).json(resData(true, "success", result));
  } catch (err) {
    console.log(err);
    await transaction.rollback();
    return res
      .status(500)
      .json(resData(false, "user_info already exits", null));
  }
};

const registerUserInfo = asyncWrapper(async (req, res, next) => {
  const { occupation } = req.body;
  console.log("got req by", occupation);
  if (occupation === "student") return registerStudentInfo(req, res, next);
  else if (occupation === "company") return registerCompanyInfo(req, res, next);
  // else if(occupation === 'other') return registerOtherInfo(req, res, next)

  res.status(400).json(resData(false, "don't have this occupation type", null));
});

const getUserInfo = asyncWrapper(async (req, res, next) => {
  const userId = req.userId;

  let userData = await UserInfo.findOne({
    where: { userId },
    attributes: ["userId", "occupation"],
    include: [
      {
        model: StudentInfo,
        attributes: { exclude: ["createdAt", "updatedAt"] },
        required: false,
      },
      {
        model: CompanyInfo,
        attributes: { exclude: ["createdAt", "updatedAt"] },
        required: false,
      },
    ],
  });

  userData = userData.toJSON();

  let result = {};
  if (userData.occupation === "student") result = userData.StudentInfo;
  else if (userData.occupation === "company") result = userData.CompanyInfo;

  result.userId = userData.userId;
  result.occupation = userData.occupation;

  res.status(200).json(resData(true, "success", result));
});

const updatedUserInfo = asyncWrapper(async (req, res, next) => {
  //find user_info_id
  //update

  const userId = req.userId;

  let data = await UserInfo.findOne({
    where: { userId },
  });

  if (!data)
    return res.status(400).json(resData(false, "user data not found", null));

  data = data.toJSON();

  let table = "";
  if (data.occupation === "student") table = StudentInfo;
  else if (data.occupation === "company") table = CompanyInfo;

  req.body.id = data.id;

  let updatedUserData = await table.update(req.body, {
    where: { userInfoId: data.id },
    returning: true,
  });

  updatedUserData = updatedUserData[1][0].toJSON();

  res.status(200).json(resData(true, "user data updated", updatedUserData));
});

const getUserProject = asyncWrapper( async(req, res, next) => {
  const creatorId = req.userId

  const projects = await Project.findAll({
    where: {creatorId}
  })

  if(!projects)
    return res.status(500).json(resData(false, 'something went wrong'))

  res.status(200).json(resData(true, 'success', projects))
})

const getUserTask = asyncWrapper( async (req, res, next) => {
  const userId = req.userId

  const task = await Task.findAll({
    include: [
      {
        model: TaskMember,
        where: {userId},
        required: true,
        attributes: []
      },
    ],
    attributes: { exclude: ['updatedAt', 'createdAt'] }
  })

  if(!task) return res.status(500).json(resData(false, 'somthing went wrong', null))

  res.status(200).json(resData(true, 'success', task))
})


module.exports = {
  findUser,
  registerUserInfo,
  updatedUserInfo,
  getUserInfo,
  getUserProject,
  getUserTask,
};
