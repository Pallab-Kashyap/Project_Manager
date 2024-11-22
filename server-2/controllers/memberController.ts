import { Request, Response } from "express"
import { asyncWrapper } from "../utils/asyncWarpper"
import errorResponse from "../utils/apiError"
import projectMemberModel from "../models/projectMemberModel"
import { inviteTemplate } from "../utils/emailTemplates"
import userModel from "../models/userModel"
import apiResponse from "../utils/apiResponse"
import projectModel from "../models/projectModel"
import {generateToken, verifyToken} from "../utils/generateAndVerifyToken"
import jwt from 'jsonwebtoken'
import sendEmailsToMembers from "../services/redis"
import mongoose from "mongoose"

export interface TokenPayload {
    projectId: string;
    email: string;
}


const sendRequestToJoin =  async(emails: [''], projectId: mongoose.Schema.Types.ObjectId, projectName: string, invitedBy: string, position: string) => {
    const template = inviteTemplate(projectName, invitedBy, position)
    const subject = `You're Invited to a Project!`
    sendEmailsToMembers(emails, projectId, subject, template)
}

const saveMembersInDB = async (members: [{}]) => {
    try {
        await projectMemberModel.insertMany(members, { ordered: false })
        return true
    } catch (error) {
        return false
    }
}

const addMember = asyncWrapper( async(req: Request ,res: Response) => {

    const { userId, projectId, position, email} = req.body

    if(!userId || !projectId || !position || !(email && typeof(email) === 'object' && email.length != 0)){
        return errorResponse(400, '{ userId, projectId, position, email = string[] } are required', res);
    }


    const [user, project] = await Promise.all([
        userModel.findById(userId).select('userName'),
        projectModel.findById(projectId).select('projectName')
    ])
    
    if(!user || !project){
        return apiResponse(400, null, 'user ID or project ID is invalid', res)
    }
    
    const userName = user.userName
    const projectName = project.projectName
    

    await sendRequestToJoin(email, projectId, projectName, userName, position)

    const members = email.map((userEmail: string) => ({ email: userEmail, projectId, position}))
    saveMembersInDB(members)

    res.status(204).send()
})

const joinRequestAccepted = asyncWrapper( async(req: Request, res: Response) => {

    const { token } = req.body

    if(!token){ 
        return errorResponse(400, 'token is undefined', res)
    }
  
    const verifiedToken = verifyToken(token)

    if(!verifiedToken){
        return errorResponse(500, 'token is invalid', res)
    }

    const { projectId, email } = verifiedToken

    if(!projectId || !email) {
        return errorResponse(400, 'token is invalid', res)
    }

    const updatedMember = await projectMemberModel.findOneAndUpdate(
        { projectId, email }, 
        [
          {
            $set: {
              userId: {
                $ifNull: [
                  { $arrayElemAt: [{ $map: { input: '$user', as: 'u', in: '$$u._id' } }, 0] },
                  null,
                ],
              },
              verify: true,
              email: '',
            },
          },
        ],
        { new: true }
      );
    
      if (!updatedMember) {
        return errorResponse(404, 'No matching project member entry or user not found', res);
      }

      apiResponse(201, updatedMember, 'add as member', res)

})

const removeMember = asyncWrapper( async(req: Request, res: Response) => {
    const { userId, memberId, projectId } = req.body

    
})

export {
    addMember,
    joinRequestAccepted,
    removeMember
}