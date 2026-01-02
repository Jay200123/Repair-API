import { Request, Response, NextFunction } from "express";
import { ErrorHandler } from "../@utils";

type MiddlewareFn = (
    req: Request, 
    res: Response, 
    next: NextFunction
) => void;

type ErrorMiddlewareFn = (
  err: ErrorHandler,
  req: Request,
  res: Response,
  next: NextFunction
) => void;

export {
    MiddlewareFn,
    ErrorMiddlewareFn
}