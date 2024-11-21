import { NextFunction, Request, Response} from "express"
import { asyncWrapper } from "../utils/asyncWarpper";
import userModel, { UserSchema } from "../models/userModel";
import errorResponse from "../utils/errorResponse";
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken";

const login = asyncWrapper( async (req: Request, res: Response) => {
    const { email, password } = req.body

    const user = await userModel.findOne({ email });

    if(!user){
        errorResponse(404, 'invalid credentials', res)
        return
    }

    const match = await bcrypt.compare(password, user.password)

    if(!match) return errorResponse(401, 'invalid credentials', res)
    if(!user._id) return errorResponse(500, 'id not found', res)
    const jwtSecret = process.env.JWT_SECRET
    if(!jwtSecret) return errorResponse(500, 'jwt secret is undefined', res)
    const token = jwt.sign({ userId : user._id }, jwtSecret, { expiresIn: '7d'})

    user.password = ''
    

    res.status(200).json({ token, user})
})

const signin = asyncWrapper( async (req: Request, res: Response) => {
    const { userName, email, password } = req.body

    const data = await userModel.findOne({ email });

    if(data){
        errorResponse(401, 'user already exist with this email', res)
        return
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const user = await userModel.create({ userName, email, password: hashedPassword })  
    
    if(!user) return errorResponse(500, 'something went wrong plese try again later', res)

    if(!user._id) return errorResponse(500, 'id not found', res)
    const jwtSecret = process.env.JWT_SECRET
    if(!jwtSecret) return errorResponse(500, 'jwt secret is undefined', res)
    const token = jwt.sign({ userId : user._id }, jwtSecret, { expiresIn: '7d'})

    user.password = ''
    

    res.status(200).json({ token, user})
})

const resetPassword = () => {}

const forgetPassword = () => {}