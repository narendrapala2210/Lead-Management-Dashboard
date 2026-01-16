import { Request, Response, NextFunction } from "express";
import logger from "../utils/logger";

export class CustomError extends Error {
  public statusCode: number;
  public status: boolean;
  public isOperational: boolean;

  constructor(message: string, statusCode = 500) {
    super(message);
    this.statusCode = statusCode;
    this.status = false;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

export const errorHandler = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const error = err as CustomError;

  error.statusCode = error.statusCode || 500;
  error.status = error.status ?? false;
  error.message = error.message || "Something went wrong!";

  // TODO: Prod errors
  // TODO: Dev errors

  logger.error(`UNEXPECTED ERROR 💥: ${error.message}`);

  return res.status(error.statusCode).json({
    status: error.status,
    message: error.message,
  });
};
