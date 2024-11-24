import { Request, Response } from "express"
import errorResponse from "../utils/apiError"
import uploadOnCloudinary from "../services/uploadCloudinary"
import { asyncWrapper } from "../utils/asyncWarpper"
import docModel from "../models/documentModel"
import apiResponse from "../utils/apiResponse"

const uploadDocument = asyncWrapper(async (req: Request, res: Response) => {
    const filePath = req.file?.path
    const { userId, projectId } = req.body

    if(!filePath) return errorResponse(400, 'file missing', res)
    if(!userId || !projectId) return errorResponse(400, 'project ID missing', res)

    try{
        const { url, publicId } = await uploadOnCloudinary(filePath)

        if(!url || !publicId) return errorResponse(500, 'Error in uploading file to cloudinary', res)
        
        const doc = await docModel.create({
            projectId,
            userId,
            url,
            publicId
        }) 

        if(!doc) return errorResponse(500, 'Error storing in DB', res)

        apiResponse(200, { url }, 'document stored successfully', res)
    }
    catch( error ){
        return errorResponse(500, error, res)
    }
})

const getDocument = asyncWrapper(async (req: Request, res: Response) => {
    const { projectId } = req.body

    if(!projectId) return errorResponse(400, 'projectId missing', res)

    const urls = await docModel.find({ projectId }).select('url')

    if(!urls) return errorResponse(404, 'no document found', res)

    apiResponse(200, { url: urls }, 'success', res)
})


export {
    uploadDocument,
    getDocument
}