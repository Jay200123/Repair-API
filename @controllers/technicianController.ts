import { STATUSCODE } from "../@constants";
import { TechnicianService } from "../@services";
import { MiddlewareFn } from "../@types";
import { logger, SuccessHandler } from "../@utils";

export class TechnicianController {
  constructor(private technicianService: TechnicianService) {}

  getAllTechnicians: MiddlewareFn = async (req, res, next) => {
    logger.info({
      GET_ALL_TECHNICIANS_REQUEST: {
        message: "SUCCESS",
      },
    });

    const results = await this.technicianService.getAllTechnicians();

    logger.info({
      GET_ALL_TECHNICIANS_RESPONSE: {
        message: "SUCCESS",
      },
    });

    return SuccessHandler(res, STATUSCODE.SUCCESS, results, "Success");
  };
}
