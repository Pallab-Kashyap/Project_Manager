const resData = require("../utils/apiRes");
const { sequelize } = require("../config/db");
const asyncWrapper = require("../utils/asyncWrapper");
// const Users = require("../models/userModels/usersModel");
// const UserInfo = require("../models/userModels/userInfoModel");
// const StudentInfo = require("../models/userModels/studentModel");
const CompanyInfo = require("../models/userModels/companyModel");
const { Users, UserInfo, StudentInfo } = require('../models/userModels/association')

const findUser = async (email) => {
  let user = await Users.findOne({
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
    const { occupation, institute_name, stream, year, domain, state, country } =
      req.body;

    if (!(institute_name && stream && year && domain && state && country))
      return res.status(400).json(resData(false, "all fields required", null));

    const userInfo = await UserInfo.create(
      {
        userId,
        occupation,
      },
      { transaction }
    );

    const user_info_id = await userInfo.toJSON().id;

    console.log("userinfoid", user_info_id);

    let result = await StudentInfo.create(
      {
        user_info_id,
        institute_name,
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
      company_name,
      company_size,
      sector,
      website,
      state,
      country,
    } = req.body;

    if (!(company_name && company_size && sector && state && country))
      return res.status(400).json(resData(false, "all fields required", null));

    const userInfo = await UserInfo.create(
      {
        userId,
        occupation,
      },
      { transaction }
    );

    const user_info_id = await userInfo.toJSON().id;
    console.log("com");
    let result = await CompanyInfo.create(
      {
        user_info_id,
        company_name,
        company_size,
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
    where: { user_info_id: data.id },
    returning: true,
  });

  updatedUserData = updatedUserData[1][0].toJSON();

  res.status(200).json(resData(true, "user data updated", updatedUserData));
});

module.exports = {
  findUser,
  registerUserInfo,
  updatedUserInfo,
  getUserInfo,
};
