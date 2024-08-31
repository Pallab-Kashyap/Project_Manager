const resData = require("../utils/apiRes");
const { sequelize } = require("../config/db");
const asyncWrapper = require("../utils/asyncWrapper");
const { MEMBER_POSITION } = require("../utils/constant");
const { Project, ProjectMember, TaskMember } = require("../models");

const addMember = async (data, type, transaction) => {

  let member = null;
  if (type === "project") {
    member = await ProjectMember.create(data, { transaction });
  } else if (type === "task") {
      member = await TaskMember.bulkCreate(data, { transaction });
    }
    return member;
  }

const getAllProject = asyncWrapper( async (req, res, next) => {
  const userId = req.userId
  console.log(userId);

  const projects = await Project.findAll({
    include: [
      {
        model: ProjectMember,
        where: {userId},
        required: true,
        attributes: []
      },
    ],
    attributes: { exclude: ['updatedAt', 'createdAt'] }
  })
  console.log(projects);

  if(!projects) return res.status(500).json(resData(false, 'somthing went wrong', null))

  res.status(200).json(resData(true, 'success', projects))
})

// const getProjectDetails = asyncWrapper(async (req, res, next) = {

// })

const createProject = asyncWrapper(async (req, res, next) => {
  const {
    projectName,
    description,
    startDate,
    endDate,
    leaderboard,
    status,
    pack,
    membersList,
  } = req.body;

  req.creatorId = req.userId;
  req.user = undefined;
  req.userId = undefined;

  if (!(projectName && startDate && endDate && status))
    return res.status(400).json(resData(false, "all fields required", null));

  const transaction = await sequelize.transaction();

  try {
    console.log(req.creatorId)
    let project = await Project.create({
        creatorId : req.creatorId,
        projectName,
        startDate,
        endDate,
        status
    }, { transaction });

    project = project.toJSON();

    const data = {
      projectId: project.id,
      userId: req.creatorId,
      position: MEMBER_POSITION.PROJECT_LEAD,
    };

    const member = await addMember(data, "project", transaction);

    if (!member) throw new Error("member didn't added");

    await transaction.commit();
    res
      .status(200)
      .json(resData(true, `congrats ${projectName} created`, project));
  } catch (err) {
    console.log(err);
    await transaction.rollback();
    res.status(500).json(resData(false, "something went wrong", err));
  }
});

const updateProject = asyncWrapper( async(req, res, next) => {
  const { projectId } = req.body
  const data = req.body.data

  const updatedProjectDetails = await Project.update(
    data,
    {
      where: {id: projectId},
      returning: true,
    }
  );
  if(updatedProjectDetails[0] === 0)
    res.status(500).json(resData(false, 'internal server error', null))
  
  res.status(200).json(resData(true, 'project details updated', updatedProjectDetails[1]))

})

const deleteProject = asyncWrapper( async(req, res, next) => {
  const {projectId } = req.body
  const creatorId = req.userId

  let userId = await Project.findByPk( projectId, {
    attributes: ["creatorId"]
  })

  userId = await userId.toJSON().creatorId
  
  if(userId != creatorId)
    res.status(401).json(resData(false, 'user is unauthorized to delete this project', null))
  else {
    await Project.destroy({
      where: {id: projectId}
    })
    .then(() => res.status(200).json(resData(true, `project ${projectId} deleted`, null)))
    .catch(() => res.status(5000).json(resData(false, 'somthing went wrong', null)))
  }

})


module.exports = {
  addMember,
  getAllProject,
  createProject,
  updateProject,
  deleteProject,
};
