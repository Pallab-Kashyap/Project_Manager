import { NextFunction, Request, Response } from "express";
import { asyncWrapper } from "../utils/asyncWarpper";
import errorResponse from "../utils/apiError";
import projectModel from "../models/projectModel";
import projectMemberModel, { MemberPosition } from "../models/projectMemberModel";
import mongoose from "mongoose";



const createProject = asyncWrapper( async(req: Request ,res: Response, next: NextFunction) => {

    const { userId, projectName, startDate, endDate, status } = req.body

    if(!userId || !projectName || !startDate || !endDate)
        return errorResponse(400, 'data required', res)

    const session = await mongoose.startSession()
    session.startTransaction()

      const project = new projectModel({
          userId,
          projectName,
          startDate,
          endDate,
          status
      })

     const member = new projectMemberModel({
        projectId : project._id,
        userId,
        position: MemberPosition.OWNER,
        confirm: true
     })

     try {

        await project.save({ session })
        await member.save({ session })

     await session.commitTransaction()
      res.status(201).json({ project: project })
  } catch (error) {
    await session.abortTransaction()
    next(error)
  }
  finally{
    await session.endSession()
  }

})

const getAllProjects = asyncWrapper( async(req: Request ,res: Response) => {

    const { userId } = req.body
console.log(userId);
    let projects = await projectMemberModel.aggregate([
        
        { $match: { userId: new mongoose.Types.ObjectId(userId) } },
  
        
        {
          $lookup: {
            from: 'projects', 
            localField: 'projectId',
            foreignField: '_id',
            as: 'projectDetails',
          },
        },
  
        
        { $unwind: '$projectDetails' },
  
        
        {
          $project: {
            _id: 0, 
            projectDetails: 1,
          },
        },
      ]);

  console.log(projects);
    projects = projects.map((entry) => entry.projectDetails);

    if(!projects) return errorResponse(400, 'no projects', res)
console.log(projects);
    res.status(200).json({ projects })
})

const getProjectById = asyncWrapper( async(req: Request ,res: Response) => {
    const { projectId } = req.params


    if(!projectId) return errorResponse(400, 'projectId required', res)

    const project = await projectModel.findById(projectId)

    if(!project)  return errorResponse(400, 'invalid project ID of user ID', res)
    
    res.status(200).json({ project })
})

const updateProject = asyncWrapper( async(req: Request ,res: Response) => {

    const { userId, data, projectId } = req.body
    
    const projectMember = await projectMemberModel.findOne({userId, projectId}) 

    if (!projectMember){
        return errorResponse(400, 'user is not a member of this project', res);
    } 

    if(!(projectMember.position === MemberPosition.OWNER || projectMember.position === MemberPosition.ADMIN)){
        return errorResponse(401, 'Unauthorized to perform this task', res)
    }

    if(!data || Object.keys(data).length === 0){
        return errorResponse(400, 'update field missing', res)
    }

    const updatedProject = await projectModel.findByIdAndUpdate(projectId, data, { 
        new: true,
        runValidators: true
     })

    if(!updatedProject){
        return errorResponse(400, 'update fields are incorrect', res)
    } 

    res.status(200).json({ project: updatedProject })
})

const deleteProject = asyncWrapper( async(req: Request ,res: Response, next: NextFunction) => {

    const { userId, projectId } = req.body

    const member = await projectMemberModel.findOne({ projectId, userId })

    if(!member){
        return errorResponse(400, 'projectid or user invalid', res)
    }

    if(member.position != MemberPosition.OWNER){
        return errorResponse(401, 'Unauthorized to perform this activity', res)
    }

    const session = await mongoose.startSession();
    session.startTransaction()

try {
        await projectModel.findByIdAndDelete(projectId).session(session)
        await projectMemberModel.deleteMany({ projectId }).session(session)
    
        await session.commitTransaction()
        res.status(204).send()
} catch (error) {
    await session.abortTransaction()
    next(error)
}finally{
    session.endSession()
}

})


export {
    createProject,
    getAllProjects,
    getProjectById,
    updateProject,
    deleteProject
}