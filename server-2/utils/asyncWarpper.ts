import { NextFunction, Request, Response } from "express"

export const asyncWrapper = (fn: Function) => {
    return (res: Request, req: Response, next: NextFunction) => {
        fn(res, req, next).catch(next)
    }
}