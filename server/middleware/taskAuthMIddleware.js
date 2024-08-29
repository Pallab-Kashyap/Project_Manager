const { TaskMember } = require("../models")
const resData = require("../utils/apiRes")
const asyncWrapper = require("../utils/asyncWrapper")
const { MEMBER_POSITION } = require("../utils/constant")

const taskAuth = asyncWrapper( async (req, res, next) =>{

    const { task_id } = req.body
    const user_id = req.userId

    let userPosition = await TaskMember.findOne({
        where: {task_id,user_id},
        attributes: ["position"]
    })

    userPosition = await userPosition.toJSON().position
 console.log(userPosition);
    if(!userPosition) 
        return res.status(400).json(resData(false, "user is not a member for this project", null))
    
    // if(userPosition === MEMBER_POSITION.TASK_LEAD || userPosition === MEMBER_POSITION.PROJECT_LEAD)
        return next()

    // res.status(401).json(resData(false, 'user is not authorized to perform this action'))
})

module.exports = taskAuth;