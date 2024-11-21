import { Request, Response, NextFunction } from "express";


export const globalErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);  

 
  if (err.name === "ValidationError") {
    return res.status(400).json({
      message: "Validation Error",
      errors: err.errors, 
    });
  }

  if (err.name === "CastError") {
    return res.status(400).json({
      message: "Invalid ID format",
    });
  }


  return res.status(500).json({
    message: "Internal Server Error",
    error: err.message || "Something went wrong",
  });
};
