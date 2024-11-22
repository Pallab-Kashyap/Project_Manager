
import { Response } from "express";


// export interface ErrorParameters {
//     statusCode: Number | String,
//     message: string
// }

const errorResponse = (statusCode: number, message: any, res: Response) => {
    res.status(statusCode).json({ message })
}

export default errorResponse