const { sequelize } = require("../config/db");
const Project = require("../models");
const resData = require("../utils/apiRes");
const asyncWrapper = require("../utils/asyncWrapper");

const addMember = async() => {
    
}

const createProject = asyncWrapper(async (req, res, next) => {
    const { project_name, description, start_date, end_date, leader_board, project_status, pack, membersList } = req.body
    
    req.creator_id = req.userId
    req.user = undefined;
    req.userId = undefined;

    if(!(project_name && start_date && end_date && project_status))
        return res.status(400).json(resData(false, 'all fields required', null))

    const transaction = sequelize.transaction()

    try{
        const project = Project.create(req.body,{transaction})

    }catch(err){
        res.status(500).json(resData(false, 'something went wrong', err))
    }

})

