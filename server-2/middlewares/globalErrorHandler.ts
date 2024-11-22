import { Request, Response, NextFunction, ErrorRequestHandler } from "express";


export const globalErrorHandler: ErrorRequestHandler = (error: any, req: Request, res: Response, next: NextFunction) => {
  console.error(error.stack);  

 
  if (error.name === "ValidationError") {
     res.status(400).json({
      message: "Validation Error",
      errors: error.errors, 
    });
    return
  }

  if (error.name === "CastError") {
    res.status(400).json({
      message: "Invalid ID format",
    });
    return 
  }


  res.status(500).json({
    message: "Internal Server Error",
    error: error.message || "Something went wrong",
  });
};
