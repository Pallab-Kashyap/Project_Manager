const resData = require("../utils/apiRes");
const { sequelize } = require("../config/db");
const { TaskMember, Task } = require("../models");
const { addMember } = require("./projectController");
const asyncWrapper = require("../utils/asyncWrapper");

const getProjectTask = asyncWrapper(async (req, res, next) => {
    const { project_id, parent_id } = req.body
    const user_id = req.userId

    if(!parent_id && !project_id)
        return res.status(400).json(resData(false, 'project_id or parent_id needed'))

    let task = await Task.findAll({
        where: {project_id}
        })

        console.log(task);
    if(task.length > 0)
      task = await task.toJSON()

    res.status(200).json(resData(true, 'success', task))
})

const createTask = asyncWrapper(async (req, res, next) => {

  const {
    project_id,
    parent_id,
    task_name,
    start_date,
    end_date,
    status,
    priority,
    memberList,
  } = req.body;

  const creator_id = req.userId


  if (!(task_name && project_id && start_date && end_date && status))
    return res.status(400).json(resData(false, "all fields required", null));

  const transaction = await sequelize.transaction();

  try {

    let task = await Task.create({
        creator_id,
        project_id,
        parent_id,
        start_date,
        end_date,
        status,
        task_name,
        priority
    }, { transaction });

    task = await task.toJSON()

    console.log(memberList);
    if(!memberList || memberList.length == 0){
      console.log(task);
        return res
                .status(200)
                .json(resData(true, `congrats ${task_name} created`, task));
  
}
    else{
        memberList.forEach(ele => {ele.task_id = task.id})

        const member = await addMember(memberList, "task", transaction);
    
        if (!member) throw new Error("member didn't added");
    }



    await transaction.commit();
    console.log('commited');
    res
      .status(200)
      .json(resData(true, `congrats ${task_name} created`, task));
  } catch (err) {
    console.log(err);
    await transaction.rollback();
    res.status(500).json(resData(false, "something went wrong", err));
  }
});

const updateTask = asyncWrapper( async(req, res, next) => {
  const { task_id } = req.body
  const data = req.body.data

  const updatedProjectDetails = await Task.update(
    data,
    {
      where: {id: task_id},
      returning: true,
    }
  );

  if(!updatedProjectDetails)
    res.status(500).json(resData(false, 'internal server error', null))
  
  res.status(200).json(resData(true, 'project details updated', updatedProjectDetails[1]))

})

const deleteTask = asyncWrapper( async(req, res, next) => {
  const { task_id } = req.body
  const creator_id = req.userId

  let userId = await Task.findByPk( task_id, {
    attributes: ["creator_id"]
  })

  userId = await userId.toJSON().creator_id
  
  if(userId != creator_id)
    res.status(401).json(resData(false, 'user is unauthorized to delete this project', null))
  else {
    await Task.destroy({
      where: {id: task_id}
    })
    .then(() => res.status(200).json(resData(true, `project ${task_id} deleted`, null)))
    .catch(() => res.status(5000).json(resData(false, 'somthing went wrong', null)))
  }

})


module.exports = {
    getProjectTask,
    createTask,
    updateTask,
    deleteTask,
};
