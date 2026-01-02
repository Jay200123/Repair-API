import type { Request, Response, NextFunction } from "express";
import { ErrorHandler, logger } from "../@utils";
import { STATUSCODE } from "../@constants";
import { SettingsRepository } from "../@repositories";

type MiddlewareFN = (req: Request, res: Response, next: NextFunction) => void;

export class AuthenticationMiddleware {
  constructor(private settingsRepository: SettingsRepository) {}

  BasicAuthVerifier(): MiddlewareFN {
    return async (req, res, next) => {
      logger.info({
        BASIC_AUTHENTICATION_REQUEST: {
          message: "SUCCESS",
        },
      });
      const basicHeaders = req.headers["authorization"];

      if (!basicHeaders) {
        logger.info({
          BASIC_AUTHENTICATION_ERROR: {
            message: "Missing Authorization Headers",
          },
        });
        throw new ErrorHandler(STATUSCODE.UNAUTHORIZED, "Unauthorized");
      }

      const basicType = basicHeaders?.split(" ")[0];

      if (basicType !== "Basic") {
        logger.info({
          BASIC_AUTHENTICATION_ERROR: {
            message: "Invalid Authorization Headers",
          },
        });
        throw new ErrorHandler(STATUSCODE.UNAUTHORIZED, "Unauthorized");
      }

      const basicCredentials = basicHeaders.split(" ")[1];

      const credentials = Buffer.from(basicCredentials, "base64").toString(
        "utf-8"
      );

      const [username, password] = credentials.split(":");

      const result = await this.settingsRepository.getBasicCredentials(
        username,
        password
      );

      if (result.length == 0) {
        throw new ErrorHandler(STATUSCODE.UNAUTHORIZED, "Unauthorized");
      }

      logger.info({
        BASIC_AUTHENTICATION_RESPONSE: {
          message: "SUCCESS",
        },
      });

      next();
    };
  }
}
