
import { Response } from "express";

const errorResponse = (statusCode: number, message: any, res: Response) => {
    res.status(statusCode).json({ message })
}

export default errorResponse