const resData = require("../utils/apiRes");
const { sequelize } = require("../config/db");
const asyncWrapper = require("../utils/asyncWrapper");
const { MEMBER_POSITION } = require("../utils/constant");
const { Project, ProjectMember, TaskMember, Users } = require("../models");

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
  const user_id = req.userId

  const projects = await Project.findAll({
    include: [
      {
        model: ProjectMember,
        where: {user_id},
        required: true,
        attributes: []
      },
      {
        model: Users,
        as: 'creator',
        attributes: ['first_name', 'last_name']
      }
    ],
    attributes: { exclude: ['updatedAt', 'createdAt'] }
  })

  if(!projects) return res.status(500).json(resData(false, 'somthing went wrong', null))

  res.status(200).json(resData(true, 'success', projects))
})

// const getProjectDetails = asyncWrapper(async (req, res, next) = {

// })

const createProject = asyncWrapper(async (req, res, next) => {
  const {
    project_name,
    description,
    start_date,
    end_date,
    leader_board,
    status,
    pack,
    membersList,
  } = req.body;

  req.creator_id = req.userId;
  req.user = undefined;
  req.userId = undefined;

  if (!(project_name && start_date && end_date && status))
    return res.status(400).json(resData(false, "all fields required", null));

  const transaction = await sequelize.transaction();

  try {
    console.log(req.creator_id)
    let project = await Project.create({
        creator_id : req.creator_id,
        project_name,
        start_date,
        end_date,
        status
    }, { transaction });

    project = project.toJSON();

    const data = {
      project_id: project.id,
      user_id: req.creator_id,
      position: MEMBER_POSITION.PROJECT_LEAD,
    };

    const member = await addMember(data, "project", transaction);

    if (!member) throw new Error("member didn't added");

    await transaction.commit();
    res
      .status(200)
      .json(resData(true, `congrats ${project_name} created`, project));
  } catch (err) {
    console.log(err);
    await transaction.rollback();
    res.status(500).json(resData(false, "something went wrong", err));
  }
});

const updateProject = asyncWrapper( async(req, res, next) => {
  const { project_id } = req.body
  const data = req.body.data

  const updatedProjectDetails = await Project.update(
    data,
    {
      where: {id: project_id},
      returning: true,
    }
  );

  if(!updatedProjectDetails)
    res.status(500).json(resData(false, 'internal server error', null))
  
  res.status(200).json(resData(true, 'project details updated', updatedProjectDetails[1]))

})

const deleteProject = asyncWrapper( async(req, res, next) => {
  const {project_id } = req.body
  const creator_id = req.userId

  let userId = await Project.findByPk( project_id, {
    attributes: ["creator_id"]
  })

  userId = await userId.toJSON().creator_id
  
  if(userId != creator_id)
    res.status(401).json(resData(false, 'user is unauthorized to delete this project', null))
  else {
    await Project.destroy({
      where: {id: project_id}
    })
    .then(() => res.status(200).json(resData(true, `project ${project_id} deleted`, null)))
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
