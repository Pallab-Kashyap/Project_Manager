import { NextFunction, Request, Response } from "express"
import { asyncWrapper } from "../utils/asyncWarpper"
import jwt from "jsonwebtoken"
import errorResponse from "../utils/apiError"

interface AuthTokenPayload {
    userId: string
}

const auth = asyncWrapper( async (req: Request, res: Response, next: NextFunction) => {

    const token  = req.header('Authorization')?.replace('Bearer ', '') || req.cookies.authToken

    if(!token) return errorResponse(400, 'Authorization token requried', res)

    const jwtSecret = process.env.JWT_SECRET
    if(!jwtSecret) return errorResponse(401, 'unauthorized user', res)

    const { userId } = jwt.verify(token, jwtSecret) as AuthTokenPayload

    if(!userId) return errorResponse(404, 'invalid token', res)

    req.body.userId = userId

    next()
})

export default auth