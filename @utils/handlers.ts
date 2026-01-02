import { Response } from "express";

type SuccessMiddleware = (
  res: Response,
  statusCode: number,
  data: any,
  message: string
) => void;

export class ErrorHandler extends Error {
  public statusCode: number;

  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}

export const SuccessHandler: SuccessMiddleware = (
  res,
  statusCode,
  data,
  message
) => {
  return res.status(statusCode).json({
    status: statusCode,
    details: data,
    message: message,
  });
};
