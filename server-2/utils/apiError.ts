
import { Response } from "express";


// export interface ErrorParameters {
//     statusCode: Number | String,
//     message: string
// }

const errorResponse = (statusCode: number, message: string, res: Response) => {
    res.status(statusCode).json({ message })
}

export default errorResponse