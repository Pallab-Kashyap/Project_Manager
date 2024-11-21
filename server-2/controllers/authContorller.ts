import { Request, Response } from "express"
import { asyncWrapper } from "../utils/asyncWarpper";
import userModel from "../models/userModel";
import errorResponse from "../utils/apiError";
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken";
import sendEmail from "../services/email";
import { forgetPasswordTamplate } from "../utils/emailTemplates";
import apiResponse from "../utils/apiResponse";


const login = asyncWrapper( async (req: Request, res: Response) => {
    const { email, password } = req.body

    if(!(email && password)) return errorResponse(400, 'required email and password', res)

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

    if(!(userName && email && password)) return errorResponse(400, 'required email and password', res)

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

const forgetPassword = asyncWrapper( async (req: Request, res: Response) => {
    const { email } = req.body

    if(!email){
        return errorResponse(400, 'email required', res)
    } 

    const user = await userModel.findOne({ email }).select('-password')

    if(!user) return errorResponse(404, "user doesn't exist", res)

    if(!user._id) return errorResponse(500, 'id not found', res)

    const jwtSecret = process.env.JWT_SECRET
    if(!jwtSecret) return errorResponse(500, 'jwt secret is undefined', res)

    const token = jwt.sign({ userId: user._id }, jwtSecret, {expiresIn: '10m'})

    const resetLink = `http://localhost/5173/resetPassword?token=${token}&id=${user._id}`

    const tamplate = forgetPasswordTamplate(resetLink)

    const emailSent = await sendEmail(email, tamplate)

    if(!emailSent) return errorResponse(500, 'something went wrong please try again', res)

    res.status(200).send({ message: `Reset link has been sent to your email: ${email}` })
    
})

const resetPassword = asyncWrapper( async (req: Request, res: Response) => {
    const { token, userId, password } = req.body

    if(token && userId && password) return errorResponse(400, 'data required', res)

    const jwtSecret = process.env.JWT_SECRET
    if(!jwtSecret) return errorResponse(500, 'jwt secret is undefined', res)


    const verifyId = jwt.verify(token, jwtSecret);

    if(!verifyId && (verifyId != userId)) return errorResponse(401, 'reset password failed please try again', res)

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    await userModel.findByIdAndUpdate({ password: hashedPassword })

    res.status(200).send({ message: 'password updated' })
})

const changePassword = asyncWrapper( async (req: Request, res: Response) => {

    const { userId, previousPassword, newPassword } = req.body

    if(!userId || !previousPassword || !newPassword){
        return errorResponse(400, 'data needed', res)
    }

    const user = await userModel.findById(userId).select('password')

    if(!user){
        return errorResponse(400, 'user not found', res)
    }

    const password = user.password

    const match = await bcrypt.compare(password, previousPassword)

    if(!match){
        return errorResponse(401, 'incorrect password', res)
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(newPassword, salt)

    await userModel.findByIdAndUpdate(userId, { password: hashedPassword })

    res.status(204)
})

export {
    login,
    signin,
    forgetPassword,
    resetPassword,
    changePassword
}
