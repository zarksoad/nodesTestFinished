import { Request, Response, NextFunction } from "express";

function errorHander(
  error: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  console.error(error.stack);

  res.status(500).json({
    status: 500,
    message: "Internal Server Error",
    error: error.message,
  });
}

export default errorHander;
