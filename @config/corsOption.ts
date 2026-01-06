import type { CorsOptions } from "cors";
import { logger } from "../@utils";

const whitelist = ["http://localhost:5173"];

const corsOption: CorsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.includes(origin)) {
      return callback(null, true);
    } else {
      logger.info({
        CORS_ORIGIN_ERROR: {
          message: "Not Allowed by CORS",
        },
      });
      return callback(new Error("Invalid Request"));
    }
  },
  credentials: true,
};

export { corsOption };
