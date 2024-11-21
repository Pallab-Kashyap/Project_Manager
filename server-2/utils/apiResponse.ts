import { Response } from "express"

const apiResponse = (statusCode: number, data: any, message: string, res: Response) => {
    res.status(statusCode)
        .json({
            data,
            message
        })
}

export default apiResponse