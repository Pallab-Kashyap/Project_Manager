const resData = require("../utils/apiRes");
const asyncWrapper = require("../utils/asyncWrapper");

const createProject = asyncWrapper(async (req, res, next) => {
    const { project_name, description, start_date, end_date, leader_board, project_status, pack } = req.body

    if(!(project_name && description && start_date && end_date && leader_board && project_status && pack))
        return res.status(400).json(resData(false, 'all fields required', null))


})