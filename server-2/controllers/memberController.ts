import { Request, Response } from "express"
import { asyncWrapper } from "../utils/asyncWarpper"
import errorResponse from "../utils/apiError"
import projectMemberModel from "../models/projectMemberModel"
import { inviteTemplate } from "../utils/emailTemplates"
import sendEmail from "../services/email"
import userModel from "../models/userModel"
import apiResponse from "../utils/apiResponse"
import projectModel from "../models/projectModel"
import {generateToken, verifyToken} from "../utils/generateAndVerifyToken"
import jwt from 'jsonwebtoken'


const sendRequestToJoin =  async(members: [''], projectName: string, invitedBy: string, position: string, link: string) => {
    const template = inviteTemplate(projectName, invitedBy, position, link)
    await sendEmail(members, template)
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

    if(!userId || !projectId || !position || !(email && email.length != 0)){
        return errorResponse(400, 'data required', res);
    }

    await projectMemberModel.create({
        userId,
        projectId,
        position
    })

    const [user, project] = await Promise.all([
        userModel.findById(userId).select('userName'),
        projectModel.findById(projectId).select('projectName')
    ])
    
    if(!user || !project){
        return apiResponse(400, null, 'user ID or project ID is invalid', res)
    }
    
    const userName = user.userName
    const projectName = project.projectName
    
    const token = generateToken({ projectId }, '10d')

    if(!token){
        return errorResponse(500, 'jwtSecret is undefined', res)
    }

    const link = `http://localhost:5173/onbording/token=${token}`
    await sendRequestToJoin(email, projectName, userName, position, link)

    const members = email.map((ele: string) => ({ userId, projectId, position, ele}))
    saveMembersInDB(members)

    res.status(204)
})

const joinRequestAccepted = asyncWrapper( async(req: Request, res: Response) => {

    const { token } = req.body

    if(token){ 
        return errorResponse(400, 'token is undefined', res)
    }
  
    const verifiedToken = verifyToken(token)

    if(!verifiedToken){
        return errorResponse(500, 'token is invalid', res)
    }

    // const { projectId } = verifiedToken



})

const removeMember = asyncWrapper( async(req: Request, res: Response) => {

})