import { Request, Response } from "express"
import userModel from "../models/userModel"
import { asyncWrapper } from "../utils/asyncWarpper"
import errorResponse from "../utils/apiError"

const fetchUser = asyncWrapper( async (req: Request, res: Response) => {
try {
        const { userId } = req.body
        console.log(userId);

        const user = await userModel.findById(userId).select('-password')
    
        if(!user) return errorResponse(404, 'user not found', res)
    
        res.status(200).json({ user })
} catch (error) {
    console.log('ERROR: ', error);
}
})

const updateUser = () => {}

const createUser = () => {}

export {
     fetchUser,
     updateUser,
     createUser
}