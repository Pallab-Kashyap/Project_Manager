const resData = require("../utils/apiRes");
const { sequelize } = require("../config/db");
const { TaskMember, Task } = require("../models");
const { addMember } = require("./projectController");
const asyncWrapper = require("../utils/asyncWrapper");

//TODO : get sub task
const getProjectTask = asyncWrapper(async (req, res, next) => {
    const { projectId, parentId } = req.body

    if(!parentId && !projectId)
        return res.status(400).json(resData(false, 'projectId or parentId needed'))
    let task = []
    if(!parentId){
    task = await Task.findAll({
        where: {projectId, parentId: null}
        })
    }else{
      task = await Task.findAll({
        where: {projectId, parentId}
      })
    }
    res.status(200).json(resData(true, 'success', task))
})

const createTask = asyncWrapper(async (req, res, next) => {

  const {
    projectId,
    parentId,
    taskName,
    startDate,
    endDate,
    status,
    priority,
    memberList,
  } = req.body;

  const creatorId = req.userId

  if (!(taskName && projectId && startDate && endDate && status))
    return res.status(400).json(resData(false, "all fields required", null));

  const transaction = await sequelize.transaction();

  try {

    let task = await Task.create({
        creatorId,
        projectId,
        parentId,
        startDate,
        endDate,
        status,
        taskName,
        priority
    }, { transaction });

    task = await task.toJSON()

    console.log(memberList);
    if(!memberList || memberList.length == 0){
      console.log(task);
        return res
                .status(200)
                .json(resData(true, `congrats ${taskName} created`, task));
  
}
    else{
        memberList.forEach(ele => {ele.taskId = task.id})

        const member = await addMember(memberList, "task", transaction);
    
        if (!member) throw new Error("member didn't added");
    }



    await transaction.commit();
    console.log('commited');
    res
      .status(200)
      .json(resData(true, `congrats ${taskName} created`, task));
  } catch (err) {
    console.log(err);
    await transaction.rollback();
    res.status(500).json(resData(false, "something went wrong", err));
  }
});

const updateTask = asyncWrapper( async(req, res, next) => {
  const { taskId } = req.body
  const data = req.body.data

  const updatedProjectDetails = await Task.update(
    data,
    {
      where: {id: taskId},
      returning: true,
    }
  );

  if(!updatedProjectDetails)
    res.status(500).json(resData(false, 'internal server error', null))
  
  res.status(200).json(resData(true, 'project details updated', updatedProjectDetails[1]))

})

const deleteTask = asyncWrapper( async(req, res, next) => {
  const { taskId } = req.body
  const creatorId = req.userId

  let userId = await Task.findByPk( taskId, {
    attributes: ["creatorId"]
  })

  userId = await userId.toJSON().creatorId
  
  if(userId != creatorId)
    res.status(401).json(resData(false, 'user is unauthorized to delete this project', null))
  else {
    await Task.destroy({
      where: {id: taskId}
    })
    .then(() => res.status(200).json(resData(true, `project ${taskId} deleted`, null)))
    .catch(() => res.status(5000).json(resData(false, 'somthing went wrong', null)))
  }

})


module.exports = {
    getProjectTask,
    createTask,
    updateTask,
    deleteTask,
};
