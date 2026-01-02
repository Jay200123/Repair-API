import { ErrorMiddlewareFn } from "../@types";

/**
 * Error Handling Middleware Class
 * @class ErrorMiddleware
 * @method errorJson - Middleware to send JSON error responses
 */

export class ErrorMiddleware {
  errorJson(): ErrorMiddlewareFn {
    return (err, req, res, next) => {
      const statusCode = err.statusCode || 500;
      const message = err.message || "Internal Server Error";

      res.status(statusCode).json({
        status: statusCode,
        message: message,
      });
    };
  }
}
