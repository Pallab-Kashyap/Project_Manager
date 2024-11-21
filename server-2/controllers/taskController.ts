import { Request, Response } from "express";
import { asyncWrapper } from "../utils/asyncWarpper";
import errorResponse from "../utils/apiError";
import taskModel from "../models/taskModel";
import taskMemberModel, { MemberPosition } from "../models/taskMemberModel";
import apiResponse from "../utils/apiResponse";


const createTask = asyncWrapper( async(req: Request ,res: Response) => {

    const { userId, taskName, startDate, endDate, projectId} = req.body

    if(!userId || !taskName || !startDate || !endDate || !projectId)
        return errorResponse(400, 'data required', res)

    const task = await taskModel.create(req.body)

    if(!task) return errorResponse(500, 'something went wrong', res)

    apiResponse(200, task, 'task created succesfully', res)
})

const getAllTasks = asyncWrapper( async(req: Request ,res: Response) => {

    const { userId } = req.body

    const tasks = await taskModel.find({ userId })

    if(!tasks) return errorResponse(400, 'no tasks', res)

    res.status(200).json({ tasks })
})

const getTaskById = asyncWrapper( async(req: Request ,res: Response) => {
    const { taskId } = req.params

    if(!taskId) return errorResponse(400, 'taskId required', res)

    const task = taskModel.findById(taskId)

    if(!task)  return errorResponse(400, 'invalid task ID of user ID', res)
    
    res.status(200).json({ task })
})

const updateTask = asyncWrapper( async(req: Request ,res: Response) => {

    const { userId, update } = req.body
    const { taskId } = req.params
    
    const taskMember = await taskMemberModel.findOne({userId, taskId}) 

    if (!taskMember){
        return errorResponse(400, 'user is not a member of this task', res);
    } 

    if(!(taskMember.position === MemberPosition.OWNER || taskMember.position === MemberPosition.ADMIN)){
        return errorResponse(401, 'Unauthorized to perform this task', res)
    }

    if(!update || Object.keys(update).length === 0){
        return errorResponse(400, 'update field missing', res)
    }

    const updatedtask = await taskModel.findByIdAndUpdate(taskId, update, { 
        new: true,
        runValidators: true
     })

    if(!updatedtask){
        return errorResponse(400, 'update fields are incorrect', res)
    } 

    res.status(200).json({ task: updatedtask })
})

const deleteTask = asyncWrapper( async(req: Request ,res: Response) => {

    const { taskId } = req.params
    const { userId } = req.body

    const member = await taskMemberModel.findOne({ taskId, userId })

    if(!member){
        return errorResponse(400, 'taskid or user invalid', res)
    }

    if(member.position != MemberPosition.OWNER){
        return errorResponse(401, 'Unauthorized to perform this activity', res)
    }

    await taskModel.findByIdAndDelete(taskId)

    res.status(204)
})


export {
    createTask,
    getAllTasks,
    getTaskById,
    updateTask,
    deleteTask
}