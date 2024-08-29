const { ProjectMember, TaskMember } = require("../models")
const resData = require("../utils/apiRes")
const { MEMBER_POSITION } = require("../utils/constant")

const projectAuth = async(req, res, next) => {
    const { project_id } = req.body
    const user_id = req.userId

        let userPosition = await ProjectMember.findOne({
            where: {project_id,user_id},
            attributes: ["position"]
        })

        if(!userPosition) 
            return res.status(400).json(resData(false, "user is not a member for this project", null))
    
         userPosition = await userPosition.toJSON().position

        if(userPosition === MEMBER_POSITION.PROJECT_LEAD)
            return next()

        res.status(401).json(resData(false, "you are unauthorized for this activity"))
}

module.exports = projectAuth