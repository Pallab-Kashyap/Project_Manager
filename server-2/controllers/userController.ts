import { Request, Response } from "express"
import userModel from "../models/userModel"
import { asyncWrapper } from "../utils/asyncWarpper"
import errorResponse from "../utils/apiError"

const fetchUser = asyncWrapper( async (req: Request, res: Response) => {
    const { userId } = req.body

    const user = await userModel.findById(userId).select('-password')

    if(!user) return errorResponse(404, 'user not found', res)

    res.status(200).json({ user })
})

const updateUser = () => {}

const createUser = () => {}

export {
     fetchUser,
     updateUser,
     createUser
}