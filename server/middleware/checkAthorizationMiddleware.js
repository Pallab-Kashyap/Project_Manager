const { ProjectMember, TaskMember } = require("../models")
const resData = require("../utils/apiRes")
const { MEMBER_POSITION } = require("../utils/constant")

const checkAuthorization = async(req, res, next) => {
    const { type, project_id, task_id } = req.body
    const user_id = req.userId
    console.log(user_id, project_id);
    
    if(!(type && (project_id || task_id)))
        return res.status(400).json(resData(false, 'type or project_id missing', null))

    if(type === 'task'){
        const userPosition = await TaskMember.findOne({
            where: {task_id,user_id},
            attributes: ["position"]
        })

        if(!userPosition) 
            return res.status(400).json(resData(false, "user is not a member for this project", null))
    
        if(userPosition === MEMBER_POSITION.PROJECT_LEAD || userPosition === MEMBER_POSITION.TASK_LEAD)
            return next()
    }
    else if(type === 'project'){
        console.log('got in');
        let userPosition = await ProjectMember.findOne({
            where: {project_id,user_id},
            attributes: ["position"]
        })

        if(!userPosition) 
            return res.status(400).json(resData(false, "user is not a member for this project", null))
    
         userPosition = await userPosition.toJSON().position

        if(userPosition === MEMBER_POSITION.PROJECT_LEAD)
            return next()
    }

        res.status(401).json(resData(false, "you are unauthorized"))
}

module.exports = checkAuthorization