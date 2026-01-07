import { STATUSCODE } from "../@constants";
import { UnitService } from "../@services/unitService";
import { MiddlewareFn } from "../@types";
import { logger, SuccessHandler } from "../@utils";

export class UnitController {
  constructor(private unitService: UnitService) {}

  getAllUnits: MiddlewareFn = async (req, res, next) => {
    logger.info({
      GET_ALL_UNITS_REQUEST: {
        message: "SUCCESS",
      },
    });

    const results = await this.unitService.getAllUnits();

    logger.info({
      GET_ALL_UNITS_RESPONSE: {
        message: "SUCCESS",
      },
    });

    return SuccessHandler(res, STATUSCODE.SUCCESS, results, "Success");
  };
}
