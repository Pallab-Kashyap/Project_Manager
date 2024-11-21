import { Request, Response } from "express";
import { asyncWrapper } from "../utils/asyncWarpper";
import errorResponse from "../utils/apiError";
import projectModel from "../models/projectModel";
import projectMemberModel, { MemberPosition } from "../models/projectMemberModel";


const createProject = asyncWrapper( async(req: Request ,res: Response) => {

    const { userId, projectName, startDate, endDate, status } = req.body

    if(!userId || !projectName || !startDate || !endDate || !status)
        return errorResponse(400, 'data required', res)

    const project = await projectModel.create({
        userId,
        projectName,
        startDate,
        endDate,
        status
    })

    if(!project) return errorResponse(500, 'something went wrong', res)

    res.status(201).json({ project: project })
})

const getAllProjects = asyncWrapper( async(req: Request ,res: Response) => {

    const { userId } = req.body

    const projects = await projectModel.find({ userId })

    if(!projects) return errorResponse(400, 'no projects', res)

    res.status(200).json({ projects })
})

const getProjectById = asyncWrapper( async(req: Request ,res: Response) => {
    const { projectId } = req.params

    if(!projectId) return errorResponse(400, 'projectId required', res)

    const project = projectModel.findById(projectId)

    if(!project)  return errorResponse(400, 'invalid project ID of user ID', res)
    
    res.status(200).json({ project })
})

const updateProject = asyncWrapper( async(req: Request ,res: Response) => {

    const { userId, update } = req.body
    const { projectId } = req.params
    
    const projectMember = await projectMemberModel.findOne({userId, projectId}) 

    if (!projectMember){
        return errorResponse(400, 'user is not a member of this project', res);
    } 

    if(!(projectMember.position === MemberPosition.OWNER || projectMember.position === MemberPosition.ADMIN)){
        return errorResponse(401, 'Unauthorized to perform this task', res)
    }

    if(!update || Object.keys(update).length === 0){
        return errorResponse(400, 'update field missing', res)
    }

    const updatedProject = await projectModel.findByIdAndUpdate(projectId, update, { 
        new: true,
        runValidators: true
     })

    if(!updatedProject){
        return errorResponse(400, 'update fields are incorrect', res)
    } 

    res.status(200).json({ project: updatedProject })
})

const deleteProject = asyncWrapper( async(req: Request ,res: Response) => {

    const { projectId } = req.params
    const { userId } = req.body

    const member = await projectMemberModel.findOne({ projectId, userId })

    if(!member){
        return errorResponse(400, 'projectid or user invalid', res)
    }

    if(member.position != MemberPosition.OWNER){
        return errorResponse(401, 'Unauthorized to perform this activity', res)
    }

    await projectModel.findByIdAndDelete(projectId)

    res.status(204)
})


export {
    createProject,
    getAllProjects,
    getProjectById,
    updateProject,
    deleteProject
}